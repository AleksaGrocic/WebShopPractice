import { Request, Response } from "express";
import { AppDataSource } from "../config/ormconfig";
import { Role } from "../models/Role";

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await AppDataSource.getRepository(Role).find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch roles." });
  }
};

export const getRole = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const role = await AppDataSource.getRepository(Role).findOneBy({
      id,
    });

    if (!role) {
      res.status(404).json({ error: "Role not found." });
      return;
    }

    res.json(role);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch role." });
  }
};

export const addRole = async (req: Request, res: Response) => {
  try {
    const newRole = AppDataSource.getRepository(Role).create(req.body);
    const result = await AppDataSource.getRepository(Role).save(newRole);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to add role." });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleteResult = await AppDataSource.getRepository(Role).delete({
      id,
    });

    if (deleteResult.affected === 0) {
      res.status(404).json({ error: "Role not found." });
      return;
    }

    res.status(200).json({ message: "Role successfully deleted." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete role." });
  }
};
