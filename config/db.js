const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGOURL)
    .then(() => {
      console.log("MongoDB Connected...");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDB;
