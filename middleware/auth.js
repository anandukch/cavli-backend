import AwsCredModel from "../models/awsCred.js";
import jwt from "jsonwebtoken";

export const authorizer = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    const decodedData = jwt.verify(token, process.env.JWT_SECRET || "secret");
    let _user = await AwsCredModel.findOne({
      _id: decodedData._id,
    });
    if (!_user) return res.status(401).json({ message: "unauthorized" });
    req.user = decodedData?._id;

    next();
  } catch (error) {
    res.status(404).json({ message: "Please enter aws credentials" });
  }
};
