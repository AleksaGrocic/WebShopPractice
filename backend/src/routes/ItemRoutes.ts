import express from "express";
import {
  getItem,
  getAllItems,
  addItem,
  deleteItem,
} from "../controllers/ItemController";

const router = express.Router();

router.get("/", getAllItems);
router.get("/:id", getItem);
router.post("/", addItem);
router.delete("/:id", deleteItem);

export default router;
