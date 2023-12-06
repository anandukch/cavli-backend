import jwt from "jsonwebtoken";

export const getTokenData = (req) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return null;
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
  return decoded;
};
