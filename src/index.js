import app from "./app";
import { PORT } from "./config";
import { dbConnection } from "./database";
import { DEBUG } from "./utils/loggers";

app.listen(PORT, () => {
  console.log(`Server on port: http://localhost:${PORT}/`);
});
app.on("error", (error) => {
  console.log(error);
  DEBUG(`[index.js]: ${error}`);
});

dbConnection();
