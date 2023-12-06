import express, { json } from "express";
const app = express();
import cors from "cors";
import pkg from 'body-parser';
const { urlencoded } = pkg;
import { config } from "dotenv";
config();
import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import swaggerUi from 'swagger-ui-express';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerOutput = require("./swagger-output.json");
// import swaggerOutput from "./swagger-output.json" assert { type: "json" };

connectDB();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use("/", routes);

app.listen(5000, () => {
  console.log("Server is running on port http://localhost:5000");
});
