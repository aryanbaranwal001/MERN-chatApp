import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("JWTtoken", token, {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // in milliseconds
    httpOnly: true, // to prevent XSS attacks
    sameSite: "strict", // CSRF attacks cross site request forgery attacks
    secure: process.env.NODE_ENV === "production" ? true : false,
  });

  return token;
};
