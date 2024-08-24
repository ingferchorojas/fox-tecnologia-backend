import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware"; // Asegúrate de tener este middleware
import { createClient, listClients, getClient } from "../controllers/clientsController";

const router = express.Router();

// Crear un nuevo cliente
router.post("/", authMiddleware, createClient);

// Listar todos los clientes
router.get("/", authMiddleware, listClients);

// Buscar un cliente por nombre
router.get("/:name", authMiddleware, getClient);

export default router;
