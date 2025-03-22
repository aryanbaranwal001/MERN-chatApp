import { UserModel } from "../models/users.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { email, fullName, password, profilePicture } = req.body;
  try {
    if (!email || !fullName || !password) {
      res
        .status(400)
        .json({ message: "all fields, email, fullName & password must be given" });
      return;
    }

    if (password.length < 8) {
      res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
      return;
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User already exists in Database" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Here only, the data should have stored
    // but now, it is not storing :(

    const newUser = await new UserModel({
      email,
      fullName,
      password: hashedPassword,
      profilePicture,
    });

    if (newUser) {
      generateToken(newUser._id, res);

      await newUser.save();
      // I dont think this is necessary as in my previos project without it
      // the user was still saved to the database

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePicture: newUser.profilePicture,
      });
      return;
    } else {
      res.status(500).json({ message: "Failed to create user" });
      return;
    }
  } catch (error) {
    console.log("error occured in signup controller::", error.message);
    res.status(500).json({ message: "Internal server error" });
    // console.log(error);
    return;
  }
};

export const login = (req, res) => {
  res.send("login route");
};

export const logout = (req, res) => {
  res.send("logout route");
};
