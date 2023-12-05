import { connect } from "mongoose";

const connectDB = () => {
  connect(process.env.MONGOURL)
    .then(() => {
      console.log("MongoDB Connected...");
    })
    .catch((err) => {
      console.log(err);
    });
};
export default connectDB;
