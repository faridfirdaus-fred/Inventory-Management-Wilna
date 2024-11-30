import { Router } from "express";
import {
  createBahan,
  getBahan,
  updateBahan,
  deleteBahan,
} from "../controllers/bahanController";

const router = Router();

// Route to get all bahan
router.get("/", getBahan);

// Route to create a new bahan
router.post("/", createBahan);

// Route to update a bahan by ID
router.put("/:id", updateBahan);

// Route to delete a bahan by ID
router.delete("/:id", deleteBahan);

export default router;
