import { Request, Response } from "express";
import { AppDataSource } from "../config/ormconfig";
import { Category } from "../models/Category";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await AppDataSource.getRepository(Category).find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories." });
  }
};

export const getCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const category = await AppDataSource.getRepository(Category).findOneBy({
      id,
    });

    if (!category) {
      res.status(404).json({ error: "Category not found." });
      return;
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category." });
  }
};

export const addCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = AppDataSource.getRepository(Category).create(req.body);
    const result = await AppDataSource.getRepository(Category).save(
      newCategory
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to add category." });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleteResult = await AppDataSource.getRepository(Category).delete({
      id,
    });

    if (deleteResult.affected === 0) {
      res.status(404).json({ error: "Category not found." });
      return;
    }

    res.status(200).json({ message: "Category successfully deleted." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category." });
  }
};
