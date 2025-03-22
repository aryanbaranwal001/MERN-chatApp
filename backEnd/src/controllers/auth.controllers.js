import { UserModel } from "../models/users.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { email, fullName, password, profilePicture } = req.body;
  try {
    if (password.length < 8) {
      res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User already exists in Database" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await new UserModel({
      // Here only, the data should have stored
      email,
      fullName,
      password: hashedPassword,
      profilePicture,
    });
    
    if (newUser) {
      generateToken(newUser._id, res);
      
      await newUser.save(); // I dont think this is necessary as in my previos project without it
      // the user was still saved to the database
      
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePicture: newUser.profilePicture,
      });
    } else {
      res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.log("error occured in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
    // console.log(error);
  }
};

export const login = (req, res) => {
  res.send("login route");
};

export const logout = (req, res) => {
  res.send("logout route");
};
