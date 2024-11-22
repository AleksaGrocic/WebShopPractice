import { Request, Response } from "express";
import { AppDataSource } from "../config/ormconfig";
import { User } from "../models/User";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await AppDataSource.getRepository(User).find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await AppDataSource.getRepository(User).findOneBy({ id });

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user." });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const newUser = AppDataSource.getRepository(User).create(req.body);
    const result = await AppDataSource.getRepository(User).save(newUser);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to add user." });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleteResult = await AppDataSource.getRepository(User).delete({ id });

    if (deleteResult.affected === 0) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.status(200).json({ message: "User successfully deleted." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user." });
  }
};
