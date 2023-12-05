const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { config } = require("dotenv");
config();
const connectDB = require("./config/db");

connectDB();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Server is running");
});


app.use("/api", require("./routes"));

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
