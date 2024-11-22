import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./config/ormconfig";
import dotenv from "dotenv";
import ItemRoutes from "./routes/ItemRoutes";
import CategoryRoutes from "./routes/CategoryRoutes";
import UserRoutes from "./routes/UserRoutes";
import RoleRoutes from "./routes/RoleRoutes";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
const JWT_SECRET = process.env.SECRET_KEY;

app.use("/items", ItemRoutes);
app.use("/categories", CategoryRoutes);
app.use("/users", UserRoutes);
app.use("/roles", RoleRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Data source initialized!");
  })
  .catch((err) => {
    console.log("Error during data source initialization: ", err);
  });

export default app;
