import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import UserChatPreference from "../models/userChatPreference.model.js";

import { uploadMedia } from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); // Get all the users that are in database except the logged in user.

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    let chatPreference = await UserChatPreference.findOne({
      senderId:myId , receiverId:userToChatId
    })

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    if(!chatPreference){
    res.status(200).json({messages , language:null});
    }else{
    res.status(200).json({messages , language:chatPreference.preferredLanguage});
    }
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await uploadMedia(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      originalText: text,
      image: imageUrl,
    });

    await newMessage.save();

    // ✅ Create chat preference only if it doesn't already exist
    const existingPref = await UserChatPreference.findOne({
      senderId: senderId,
      receiverId: receiverId,
    });

    if (!existingPref) {
      await UserChatPreference.create({
        senderId: senderId,
        receiverId: receiverId,
        preferredLanguage: null,
      });
    }

    // ✅ Optional reverse (for receiver)
    const reversePref = await UserChatPreference.findOne({
      senderId: receiverId,
      receiverId: senderId,
    });

    if (!reversePref) {
      await UserChatPreference.create({
        senderId: receiverId,
        receiverId: senderId,
        preferredLanguage: null,
      });
    }

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
