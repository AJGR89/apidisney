import app from "./app";
import {PORT} from './config'
import { dbConnection } from "./database";

app.listen(PORT, () => {
  console.log(`Server on port: http://localhost:${PORT}/`);
});
app.on("error", (error) => {
  console.log(error);
});

dbConnection();