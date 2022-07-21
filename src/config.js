import path from "path";
import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3001;

export const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://devuser:devpassword@localhost:27017/ecommerce?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false";