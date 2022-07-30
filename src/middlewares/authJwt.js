import jwt from "jsonwebtoken";
import User from "../models/User";
import { SECRET } from "../config";
import { DEBUG } from "../utils/loggers";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).json({ message: "no token provided" });
    }
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;

    const user = await User.findById(decoded.id, { password: 0 });

    if (!user) {
      return res.status(404).json({ messge: "user not found" });
    }
    next();
  } catch (error) {
    DEBUG(`[verifyToken]: ${error}`);
    res.status(401).json({ message: "Unauthorized" });
  }
};
