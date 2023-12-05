import express, { json } from "express";
const app = express();
import cors from "cors";
import pkg from 'body-parser';
const { urlencoded } = pkg;
import { config } from "dotenv";
config();
import connectDB from "./config/db.js";
import routes from "./routes/index.js";

connectDB();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Server is running");
});


app.use("/api", routes);

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
