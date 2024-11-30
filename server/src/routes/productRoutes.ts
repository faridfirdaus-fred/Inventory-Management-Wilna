import { Router } from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

const router = Router();

// Rute untuk mendapatkan semua produk
router.get("/", getProducts);

// Rute untuk membuat produk baru
router.post("/", createProduct);

// Rute untuk memperbarui produk berdasarkan ID
router.put("/:id", updateProduct);

// Rute untuk menghapus produk berdasarkan ID
router.delete("/:id", deleteProduct);

export default router;
