import { Request, Response } from "express";
import Product from "../models/Product";

// Crear un producto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, unit_measure, stock, product_id, user_id } = req.body;

    const newProduct = new Product({
      user_id,
      product_id,
      name,
      price,
      unit_measure,
      stock
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({ data: savedProduct, message: "Producto creado exitosamente", error: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: {}, message: "Error interno del servidor", error: true });
  }
};

// Obtener productos con paginación
export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    const skip = (page - 1) * limit;

    const products = await Product.find({ user_id: req.body.user_id })
                                  .skip(skip)
                                  .limit(limit);

    const totalProducts = await Product.countDocuments({ user_id: req.body.user_id });

    if (!products || products.length === 0) {
      return res.status(200).json({
        data: [],
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
        message: "No se encontraron productos",
        error: false
      });
    }

    res.status(200).json({
      data: products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      message: "Productos encontrados",
      error: false
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: {}, message: "Error interno del servidor", error: true });
  }
};

// Actualizar un producto
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, unit_measure, stock } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, unit_measure, stock },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ data: {}, message: "Producto no encontrado", error: true });
    }

    res.status(200).json({ data: updatedProduct, message: "Producto actualizado exitosamente", error: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: {}, message: "Error interno del servidor", error: true });
  }
};
