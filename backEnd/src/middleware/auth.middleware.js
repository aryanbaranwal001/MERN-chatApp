import jwt from "jsonwebtoken";
import { UserModel } from "../models/users.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.JWTtoken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    console.log(decoded);

    const user = await UserModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // if user passes all above then user is authenticated

    // adding the user object into the request object

    req.user = user;
    
    next();


  } catch (error) {
    console.log("Error in protected route middleware::", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};


