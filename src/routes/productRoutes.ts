import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createProduct, getProducts, updateProduct } from "../controllers/productsController";

const router = express.Router();

// Ruta para crear un nuevo producto
router.post("/create", authMiddleware, createProduct);

// Ruta para obtener todos los productos con paginación
router.get("/", authMiddleware, getProducts);

// Ruta para actualizar un producto por su ID
router.put("/update/:id", authMiddleware, updateProduct);

export default router;
