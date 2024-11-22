import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
    const { password, ...userData } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = AppDataSource.getRepository(User).create({
      ...userData,
      password: hashedPassword,
    });
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

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await AppDataSource.getRepository(User).findOneBy({ email });

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid password." });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY!,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to log in." });
  }
};
