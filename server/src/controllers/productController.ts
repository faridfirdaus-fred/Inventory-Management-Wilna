import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId, name,  stock } = req.body;
    const product = await prisma.products.create({
      data: {
        productId,
        name,
        stock,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Ambil ID dari parameter route
    const { name, stock } = req.body;

    const updatedProduct = await prisma.products.update({
      where: { productId: id },
      data: {
        name,
        stock,
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.products.delete({
      where: { productId: id },
    });
    res.status(204).send(); // Mengembalikan status 204 (No Content) jika berhasil menghapus
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

