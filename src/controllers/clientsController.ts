import { Request, Response } from "express";
import Client from "../models/Client";

// Crear un nuevo cliente
export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, address, phone, latitude, longitude, user_id } = req.body;

    const newClient = new Client({
      name,
      address,
      phone,
      latitude,
      longitude,
      user_id
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
    const page = req?.query?.page ? Number(req.query.page) : 1;
    const limit = req?.query?.limit ? Number(req.query.limit) : 10;

    const skip = (page - 1) * limit;

    // Obtener los clientes con paginación
    const clients = await Client.find({ user_id: req.body.user_id, deleted_at: null })
                                .skip(skip)
                                .limit(limit);

    // Contar el número total de clientes para la paginación
    const totalClients = await Client.countDocuments({ user_id: req.body.user_id, deleted_at: null });

    res.status(200).json({
      data: clients,
      totalClients,
      totalPages: Math.ceil(totalClients / limit),
      currentPage: page,
      message: "Lista de clientes",
      error: false
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: {}, message: "Error interno del servidor", error: true });
  }
};


// Buscar un cliente por nombre
export const getClient = async (req: Request, res: Response) => {
    try {
      const name = req.params.name;
      const client = await Client.findOne({ name, user_id: req.body.user_id, deleted_at: null });
      if (!client) {
        return res.status(404).json({ data: {}, message: "Cliente no encontrado", error: true });
      }
      res.status(200).json({ data: client, message: "Datos del cliente", error: false });
    } catch (error) {
      console.log(error);
      res.status(500).json({ data: {}, message: "Error interno del servidor", error: true });
    }
};

// Editar un cliente existente
export const editClient = async (req: Request, res: Response) => {
  try {
    const clientId = req.params.id;
    const { name, address, phone, latitude, longitude } = req.body;

    const updatedClient = await Client.findOneAndUpdate(
      { _id: clientId, user_id: req.body.user_id, deleted_at: null },
      { name, address, phone, latitude, longitude },
      { new: true } // Devuelve el documento actualizado
    );

    if (!updatedClient) {
      return res.status(404).json({ data: {}, message: "Cliente no encontrado", error: true });
    }

    res.status(200).json({ data: updatedClient, message: "Cliente actualizado exitosamente", error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: {}, message: "Error interno del servidor", error: true });
  }
};

// Eliminar un cliente (soft delete)
export const deleteClient = async (req: Request, res: Response) => {
  try {
    const clientId = req.params.id;

    const deletedClient = await Client.findOneAndUpdate(
      { _id: clientId, user_id: req.body.user_id, deleted_at: null },
      { deleted_at: new Date() },
      { new: true }
    );

    if (!deletedClient) {
      return res.status(404).json({ data: {}, message: "Cliente no encontrado", error: true });
    }

    res.status(200).json({ data: deletedClient, message: "Cliente eliminado exitosamente", error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: {}, message: "Error interno del servidor", error: true });
  }
};
