import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const saltRounds = 10;

export const getUser = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    console.log(req.body);
    const user = await User.findOne({ username, deleted_at: null });
    if (!user) {
      return res.status(404).json({ data: {}, message: "Usuario no encontrado", error: true });
    }
    const result = {
      username: user.username,
      phone: user?.phone ?? '',
      first_name: user?.first_name ?? '',
      last_name: user?.last_name ?? ''
    }
    res.json({ data: result, message: "Datos del usuario", error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: {}, message: "Error interno del servidor", error: true });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password, first_name, last_name, phone } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      password: hashedPassword,
      phone: phone ?? '',
      first_name: first_name ?? '',
      last_name: last_name ?? ''
    });

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(409).json({
        data: {},
        message: "El nombre de usuario ya existe",
        error: true,
      });
    }
    
    const data = await newUser.save();

    console.log('ver',data)

    res.status(201).json({ data, message: "Usuario creado exitosamente", error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: {}, message: "Error interno del servidor", error: true });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, deleted_at: null });

    if (!user) {
      return res.status(401).json({ data: {}, message: "Autenticación fallida", error: true });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ data: {}, message: "Autenticación fallida", error: true });
    }

    const token = jwt.sign({ username: user.username, user_id: user._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: "60000h",
    });

    res.status(200).json({ data: token, message: "Autenticación exitosa", error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: {}, message: "Error interno del servidor", error: true });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { username, oldPassword, newPassword } = req.body;

    // Verificar que todos los campos están presentes
    if (!username || !oldPassword || !newPassword) {
      return res.status(400).json({ data: {}, message: "Todos los campos son requeridos", error: true });
    }

    // Encontrar al usuario
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ data: {}, message: "Usuario no encontrado", error: true });
    }

    // Comparar la contraseña antigua
    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordCorrect) {
      return res.status(401).json({ data: {}, message: "Contraseña antigua incorrecta", error: true });
    }

    // Hashear la nueva contraseña
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Actualizar la contraseña en la base de datos
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ data: {}, message: "Contraseña cambiada exitosamente", error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: {}, message: "Error interno del servidor", error: true });
  }
};

