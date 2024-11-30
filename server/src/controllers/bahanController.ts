import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getBahan = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const bahan = await prisma.bahan.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
    res.json(bahan);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving bahan" });
  }
};

export const createBahan = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { bahanId, name, stock, unit } = req.body;
    const bahan = await prisma.bahan.create({
      data: {
        bahanId,
        name,
        stock,
        unit,
      },
    });
    res.status(201).json(bahan);
  } catch (error) {
    res.status(500).json({ message: "Error creating bahan" });
  }
};

export const updateBahan = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Ambil ID dari parameter route
    const { name, stock } = req.body;

    const updatedBahan = await prisma.bahan.update({
      where: { bahanId: id },
      data: {
        name,
        stock,
      },
    });

    res.status(200).json(updatedBahan);
  } catch (error) {
    res.status(500).json({ message: "Error updating bahan" });
  }
};
export const deleteBahan = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.bahan.delete({
      where: { bahanId: id },
    });
    res.status(204).send(); // Mengembalikan status 204 (No Content) jika berhasil menghapus
  } catch (error) {
    res.status(500).json({ message: "Error deleting bahan" });
  }
};
