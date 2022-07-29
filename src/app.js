import express from "express";
import authRoutes from "./v1/routes/auth.routes";
import charactersRoutes from "./v1/routes/characters.routes";
import moviesRoutes from "./v1/routes/movies.routes";
import categoriesRoutes from "./v1/routes/category.routes";
import morgan from "morgan";
import { verifyToken } from "./middlewares/authJwt";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "./utils/swaggerOptions";
import { accessLogStream } from "./utils/loggers";
import swaggerJsondoc from "./utils/swagger-doc.json"

const app = express();
const specs = swaggerJsDoc(options);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (app.get("env") == "production") {
  app.use(morgan("myformat", { stream: accessLogStream }));
} else {
  app.use(morgan("dev")); //log to console on development
}

//routes
app.use("/auth", authRoutes);
app.use("/characters", [verifyToken], charactersRoutes);
app.use("/movies", [verifyToken], moviesRoutes);
app.use("/categories", [verifyToken], categoriesRoutes);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJsondoc,specs));
app.get("*", function (req, res) {
  res.status(404).send({
    status: "error",
    data: "404: Page not found",
  });
});

export default app;
