import jwt from "jsonwebtoken";
import User from "../models/User";
import { SECRET } from "../config"; 

export const verifyToken = async (req, res, next) => {
    try {
      const token = req.headers["x-access-token"];
  
      console.log(token);
      if (!token) {
        return res.status(403).json("no token provided");
      }
  
      const decoded = jwt.verify(token, SECRET);
      req.userId = decoded.id;
  
      const user = await User.findById(decoded.id, { password: 0 });
      console.log(user);
  
      if (!user) {
        return res.status(404).json({ messge: "user not found" });
      }
  
      console.log(decoded);
  
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };