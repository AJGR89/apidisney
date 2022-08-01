import User from "../models/User";
import { body, validationResult } from "express-validator";

export const checkDuplicateUsernameOrEmail = [
  body("username").trim().notEmpty(),
  body("email").notEmpty().isEmail(),
  body("password").notEmpty().isLength({ min: 5 }),
  async (req, res, next) => {
    try {
      const errorValidation = validationResult(req);
      if (!errorValidation.isEmpty()) {
        return res.status(500).json({
          error: "Error user data input",
        });
      }
      const user = await User.findOne({ username: req.body.username });
      if (user)
        return res.status(400).json({ message: "The user already exists" });
      const email = await User.findOne({ email: req.body.email });
      if (email)
        return res.status(400).json({ message: "The email already exists" });
      next();
    } catch (error) {
      res.status(500).json({ message: "error register user" });
    }
  },
];

export const validateCategory = [
  body("name").notEmpty().trim().isLength({ max: 100 }),
  body("imgUrl").notEmpty().trim().isLength({ max: 255 }),
  async (req, res, next) => {
    try {
      const errorValidation = validationResult(req);
      if (!errorValidation.isEmpty()) {
        return res.status(500).json({
          error: "Error category data input",
        });
      }
      next();
    } catch (error) {
      DEBUG(`[validateCategory]: ${error}`);
      res.status(500).json({ message: "error validation category" });
    }
  },
];

export const validateMovie = [
  body("title").notEmpty().trim().isLength({ max: 100 }),
  body("imgUrl").notEmpty().trim().isLength({ max: 255 }),
  body("release").isInt({ min: 1937 }),
  body("score").notEmpty().trim().isLength({ min:0, max:5 }),
  async (req, res, next) => {
    try {
      const errorValidation = validationResult(req);
      if (!errorValidation.isEmpty()) {
        return res.status(500).json({
          error: "Error movie data input",
        });
      }
      next();
    } catch (error) {
      DEBUG(`[validateMovie]: ${error}`);
      res.status(500).json({ message: "error rvalidation movie"});
    }
  },
];

export const validateCharacter = [
  body("name").notEmpty().trim().isLength({ max: 100 }),
  body("imgUrl").notEmpty().trim().isLength({ max: 255 }),
  body("history").notEmpty().trim().isLength({ max: 1500 }),
  body("age").isInt(),
  body("weight").isInt(),
  async (req, res, next) => {
    try {
      const errorValidation = validationResult(req);
      if (!errorValidation.isEmpty()) {
        return res.status(500).json({
          error: "Error character data input",
        });
      }
      next();
    } catch (error) {
      DEBUG(`[validateCharacter]: ${error}`);
      res.status(500).json({ message: "error validation chracter" });
    }
  },
];
