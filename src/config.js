import path from "path";
import { config } from "dotenv";

config();

//PORT ON LISTENEN
export const PORT = process.env.PORT || 3001;

//MONGO DB CONNECTION
export const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://devuser:devpassword@localhost:27017/nodechallenge?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false";

// SECRET WORD
export const SECRET = process.env.SECRET || "456mysecret123";

// EXpires
export const EXPIRES = parseInt(process.env.EXPIRES) || 3600;

// MAILJET
export const MAILJET_API_KEY = process.env.MAILJET_API_KEY || "MAILJET_API_KEY";
export const MAILJET_API_SECRET =
  process.env.MAILJET_API_SECRET || "MAILJET_API_SECRET";
export const MAILJET_API_SENDER =
  process.env.MAILJET_API_SENDER || "yourmail@.com";
