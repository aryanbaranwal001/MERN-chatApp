import { UserModel } from "../models/users.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import {cloudinary} from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { email, fullName, password, profilePicture } = req.body;
  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({
        message: "all fields, email, fullName & password must be given",
      });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists in Database " + user });
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

      return res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePicture: newUser.profilePicture,
      });
    } else {
      return res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.log("error occured in signup controller::", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password); // await because function is async // returns a promise

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      email: user.email,
      fullName: user.fullName,
    });
  } catch (error) {
    console.log("error occured in login controller::", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("JWTtoken", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("error occured in logout controller::", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const userId = req.user._id;

    if (!profilePicture) {
      return res.status(400).json({ message: "Profile Picture is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePicture);
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { profilePicture: uploadResponse.secure_url },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error occured in updateProfile controller::", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error occured in checkAuth controller::", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
