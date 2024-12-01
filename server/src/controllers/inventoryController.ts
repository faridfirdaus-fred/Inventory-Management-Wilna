import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Inventory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const inventory = await prisma.inventory.findMany({
      where: {
      name: {
        contains: search,
      },
      },
    });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving inventory" });
  }
};
export const getInventory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.inventory?.toString();
    const inventory = await prisma.inventory.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving inventory" });
  }
};

export const createInventory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, name, stock, unit } = req.body;
    const product = await prisma.inventory.create({
      data: {
        id,
        name,
        stock,
        unit,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

export const updateInventory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Ambil ID dari parameter route
    const { name, stock, unit } = req.body;

    const updatedInventory = await prisma.inventory.update({
      where: { id: id },
      data: {
        id,
        name,
        stock,
        unit,
      },
    });

    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteInventory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.inventory.delete({
      where: { id: id },
    });
    res.status(204).send(); // Mengembalikan status 204 (No Content) jika berhasil menghapus
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};
