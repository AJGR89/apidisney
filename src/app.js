import path from "path";
import express from "express";
import authRoutes from "./v1/routes/auth.routes";
import morgan from "morgan";
import { dbConnection } from "./database";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.use("/auth", authRoutes);
app.get("*", function (req, res) {
  res.status(404).send({
    status: "error",
    data: "404: Page not found",
  });
});

dbConnection();

export default app;
