import { MessageModel } from "../models/message.model.js";
import { cloudinary } from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await UserModel.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar::", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const otherPersonId = req.params.otherPersonId;
    const myId = req.user._id;
    const messages = await MessageModel.find({
      $or: [
        { senderId: myId, receiverId: otherPersonId },
        { senderId: otherPersonId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    // Sorted Them

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages::", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const { receiverId } = req.params;

    let imageUrl;

    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadedResponse.secure_url;
    }

    const newMessage = new MessageModel({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    const savedMessage = await newMessage.save();

    // todo: realtime functionality goes here => socket.io

    return res.status(201).json(savedMessage);
    
  } catch (error) {
    console.log("Error in sendMessage::", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
