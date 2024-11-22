import { DataSource } from "typeorm";
import { Item } from "../models/Item";
import dotenv from "dotenv";
import { Category } from "../models/Category";
import { Role } from "../models/Role";
import { User } from "../models/User";
import { Cart } from "../models/Cart";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [Item, Category, User, Role, Cart],
  migrations: [],
  subscribers: [],
});
