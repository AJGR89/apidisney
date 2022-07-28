import { mongoose } from "mongoose";
import { MONGODB_URI } from "./config";
import { DEBUG } from "./utils/loggers";

export const dbConnection = () => {
  try {
    mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Base de datos conectada");
  } catch (error) {
    DEBUG(`[dbConnection]: ${error}`);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};
