import express from "express";
import {
  getUser,
  getAllUsers,
  addUser,
  deleteUser,
} from "../controllers/UserController";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", addUser);
router.delete("/:id", deleteUser);

export default router;
