import { Request, Response } from "express";
import Client from "../models/Client"; // Asegúrate de tener el modelo Client definido como lo hicimos antes

// Crear un nuevo cliente
export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, address, phone, latitude, longitude } = req.body;

    const newClient = new Client({
      name,
      address,
      phone,
      latitude,
      longitude,
    });

    // Guardar el nuevo cliente en la base de datos
    await newClient.save();

    res.status(201).json({ data: {}, message: "Cliente creado exitosamente", error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: {}, message: "Error interno del servidor", error: true });
  }
};

// Listar todos los clientes
export const listClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.status(200).json({ data: clients, message: "Lista de clientes", error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: {}, message: "Error interno del servidor", error: true });
  }
};

// Buscar un cliente por nombre
export const getClient = async (req: Request, res: Response) => {
    try {
      const name = req.params.name;
      const client = await Client.findOne({ name });
      if (!client) {
        return res.status(404).json({ data: {}, message: "Cliente no encontrado", error: true });
      }
      res.status(200).json({ data: client, message: "Datos del cliente", error: false });
    } catch (error) {
      console.log(error);
      res.status(500).json({ data: {}, message: "Error interno del servidor", error: true });
    }
  };
  
