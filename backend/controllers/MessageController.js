const Message = require("../models/message");
const mongoose = require("mongoose");

const getMessages = async (conversationId) => {
  try {
    const messages = await Message.find({ conversationId: conversationId }).populate([
      "sender"
    ]);
    return messages ? messages : null;
  } catch (err) {
    return next(err);
  }
};


const postMessage = async (req, res, next) => {
  try {
    const text = req.body.message;
    const sender = req.user._id; // current user
    // const receivers = new mongoose.Types.ObjectId(req.body.receiverId);
    const conversationId = new mongoose.Types.ObjectId(req.body.conversationId);
    await Message.create({
      text,
      sender,
      conversationId,
    });
    res.status(201).json({ message: "success" });
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    return next(error);
  }
};


module.exports = {
  getMessages,
  postMessage
};
