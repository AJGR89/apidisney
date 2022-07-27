import path from "path";
import express from "express";
import authRoutes from "./v1/routes/auth.routes";
import charactersRoutes from "./v1/routes/characters.routes";
import moviesRoutes from "./v1/routes/movies.routes";
import categoriesRoutes from "./v1/routes/category.routes";
import morgan from "morgan";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.use("/auth", authRoutes);
app.use("/characters", charactersRoutes);
app.use("/movies", moviesRoutes);
app.use("/categories", categoriesRoutes);
app.get("*", function (req, res) {
  res.status(404).send({
    status: "error",
    data: "404: Page not found",
  });
});

export default app;
