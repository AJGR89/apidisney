import path from "path";
import express from "express";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get("*", function (req, res) {
    res.status(404).send({
      status: "error",
      data: "404: Page not found",
    });
  });


export default app;