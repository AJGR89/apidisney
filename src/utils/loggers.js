import path from "path";
import morgan from "morgan";
import fs from "fs";
import moment from "moment";
import "moment-timezone";
import { TZ } from "../config";
import log4js from "log4js";
import app from "../app";

/** MORGAN */
export const accessLogStream = fs.createWriteStream(
  path.resolve("./logs/access.log"),
  { flags: "a" }
);
morgan.token("date", (req, res, tz) => {
  return moment().tz(tz).format("YYYY-MM-DD HH:mm:ss");
});
morgan.format("myformat", `:date[${TZ}] | :method | :url | :response-time ms`);

/** LOG4JS */
log4js.configure({
  appenders: {
    debugFile: { type: "file", filename: path.resolve("./logs/debug.log") },
    debugConsole: { type: "console" },
  },
  categories: {
    default: { appenders: ["debugConsole"], level: "warn" },
    errors: { appenders: ["debugFile"], level: "error" },
  },
});

export const DEBUG = (message) => {
  if (app.get("env") == "production") {
    const logger = log4js.getLogger("errors");
    logger.error(message);
    return;
  }
  console.log(message);
};
