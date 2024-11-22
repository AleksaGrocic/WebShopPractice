import express from "express";
import {
  getUser,
  getAllUsers,
  addUser,
  deleteUser,
  login,
} from "../controllers/UserController";
import { authenticateToken } from "../middlewares/AuthenticateToken";

const router = express.Router();

router.get("/", authenticateToken, getAllUsers); // Protected
router.get("/:id", authenticateToken, getUser); // Protected
router.post("/", addUser); // No authentication required to add user
router.post("/login", login); // No authentication required to log in
router.delete("/:id", authenticateToken, deleteUser); // Protected

export default router;
