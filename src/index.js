import app from "./app";
import {PORT} from './config'


app.listen(PORT, () => {
  console.log(`Server on port: http://localhost:${PORT}/`);
});
app.on("error", (error) => {
  console.log(error);
});