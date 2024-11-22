import { Request, Response } from "express";
import { AppDataSource } from "../config/ormconfig";
import { Item } from "../models/Item";

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await AppDataSource.getRepository(Item).find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items." });
  }
};

export const getItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const item = await AppDataSource.getRepository(Item).findOneBy({ id });

    if (!item) {
      res.status(404).json({ error: "Item not found." });
      return;
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch item." });
  }
};

export const addItem = async (req: Request, res: Response) => {
  try {
    const newItem = AppDataSource.getRepository(Item).create(req.body);
    const result = await AppDataSource.getRepository(Item).save(newItem);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to add item." });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleteResult = await AppDataSource.getRepository(Item).delete({ id });

    if (deleteResult.affected === 0) {
      res.status(404).json({ error: "Item not found." });
      return;
    }

    res.status(200).json({ message: "Item successfully deleted." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item." });
  }
};
