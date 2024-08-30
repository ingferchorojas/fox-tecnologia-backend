import { Request, Response } from "express";
import Order from "../models/Order";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { client_id, user_id, items, payment_method, comments, invoice } = req.body;

    // Crear una nueva orden
    const newOrder = new Order({
      client_id,
      user_id,
      items,
      payment_method,
      comments: comments ?? '',
      invoice
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ data: savedOrder, message: "Orden creada exitosamente", error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: {}, message: "Error interno del servidor", error: true });
  }
}

export const getOrders = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const { user_id } = req.body;

    const skip = (page - 1) * limit;

    const orders = await Order.find({ user_id, deleted_at: null })
                              .skip(skip)
                              .limit(limit)
                              .populate({
                                path: 'client_id',
                                select: 'name'
                              });

    const totalOrders = await Order.countDocuments({ user_id, deleted_at: null });

    if (!orders || orders.length === 0) {
      return res.status(200).json({
        data: [],
        totalOrders,
        totalPages: Math.ceil(totalOrders / limit),
        currentPage: page,
        message: "No se encontraron órdenes para este usuario",
        error: false
      });
    }

    res.status(200).json({
      data: orders,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page,
      message: "Órdenes encontradas",
      error: false
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: {}, message: "Error interno del servidor", error: true });
  }
};
