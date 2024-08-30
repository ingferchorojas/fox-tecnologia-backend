import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createOrder, getOrders } from "../controllers/ordersController";

const router = express.Router();

// Ruta para crear una nueva orden
router.post("/create", authMiddleware, createOrder);

// Ruta para obtener todas las órdenes de un usuario
router.get("/", authMiddleware, getOrders);

export default router;
