import { Router } from "express";
import {
  createInventory,
  getInventory,
  updateInventory,
  deleteInventory,
} from "../controllers/inventoryController";

const router = Router();

// Route to get all Inventory
router.get("/", getInventory);

// Route to create a new Inventory
router.post("/", createInventory);

// Route to update a Inventory by ID
router.put("/:id", updateInventory);

// Route to delete a Inventory by ID
router.delete("/:id", deleteInventory);

export default router;
