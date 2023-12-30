const Chat = require("../models/chat");
const mongoose = require("mongoose");
const { getMessages } = require("./MessageController");


const getChatConversation = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const receiverId = req.body.userId;
    const userIds = [currentUser._id, new mongoose.Types.ObjectId(receiverId)];

    // find chat and select user's name & email
    const existChat = await Chat.findOne({ users: { $all: userIds }, isRoom: false }).populate({
      path: 'users',
      select: 'name email',
      match: { _id: { $ne: currentUser._id } } // Exclude the current user
    })
    .exec();
    // create new chat
    if (!existChat) {
      const newChat = await Chat.create({
        users: userIds,
        isRoom: false
      });
      const chat = await Chat.findById(newChat._id).populate({
        path: 'users',
        select: 'name email',
        match: { _id: { $ne: currentUser._id } } // Exclude the current user
      })
      return res.status(201).json({
        message: "success", data: chat, messages:null});
    };
    // fetch all message if chat already existsb
    const messages = await getMessages(existChat._id);
    res
      .status(200)
      .json({ message: "success", data: existChat, messages: messages});
  } catch (err) {
    const error = new Error(err);
    error.message = "Fail chat";
    return next(error);
  }
};


module.exports = {
  getChatConversation
};


