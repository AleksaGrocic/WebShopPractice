import express from "express";
import {
  addRole,
  getAllRoles,
  getRole,
  deleteRole,
} from "../controllers/RoleController";

const router = express.Router();

router.get("/", getAllRoles);
router.get("/:id", getRole);
router.post("/", addRole);
router.delete("/:id", deleteRole);

export default router;
