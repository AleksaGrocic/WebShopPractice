import express from "express";
import {
  addCategory,
  getAllCategories,
  getCategory,
  deleteCategory,
} from "../controllers/CategoryController";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.post("/", addCategory);
router.delete("/:id", deleteCategory);

export default router;
