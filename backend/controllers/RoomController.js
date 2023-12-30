const Chat = require("../models/chat");
const mongoose = require("mongoose");
const { getMessages } = require("./MessageController");

const getAllRooms = async (req, res, next) => {
  const currentUser = req.user._id;
  const rooms = await Chat.find({ users: { $in: currentUser._id }, isRoom: true }).populate([{
    path: 'roomAdmin',
    model: 'User'
}, {
  path: "users",
  model: 'User',
  match: { _id: { $ne: currentUser._id } }, // Exclude the current user from the users array
}]);

  res
    .status(200)
    .json({ message: "Get Room success", data: rooms, messages: null});
};

const createRoom = async (req, res, next) => {
  const currentUser = req.user;
  const name = req.body.roomName;
  const roomAdmin = new mongoose.Types.ObjectId(currentUser._id); // current user
  const users = req.body.users.map(
    (userId) => new mongoose.Types.ObjectId(userId)
  ); // tramsfom userIds

  const newRoom = new Chat({
    name,
    roomAdmin,
    users,
    isRoom:true // set as room
  });
  // save
  await newRoom.save();
  const populatedRoom = await Chat.findById(newRoom._id).populate([{
    path: 'roomAdmin',
    model: 'User'
  }, {
    path: "users",
    model: 'User',
    match: { _id: { $ne: currentUser._id } }, // Exclude the current user from the users array
  }]);
  return res.status(201).json({
    message: "success",
    data: populatedRoom,
    messages: null,
  });
};

const getRoomConversation = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const roomId = req.params.roomId;
    const room = await Chat.findById(new mongoose.Types.ObjectId(roomId)).populate([{
      path: 'roomAdmin',
      model: 'User'
    }, {
      path: "users",
      model: 'User',
      match: { _id: { $ne: currentUser._id } }, // Exclude the current user from the users array
    }]);
    const messages = await getMessages(room._id);
    res
      .status(200)
      .json({ message: "success", data: room, messages: messages});
  } catch (err) {
    const error = new Error(err);
    error.message = "Fail chat";
    return next(error);
  }
};

const leaveRoom = async(req, res, next) => {
  const roomId = req.body.roomId;
  const currentUser = req.user;

  const room = await Chat.findById(new mongoose.Types.ObjectId(roomId));
  const newUsers = room.users.filter(user => user._id !== currentUser._id);
  await Chat.findByIdAndUpdate(currentUser._id, { users: newUsers });
res
  .status(200)
  .json({ message: "success"});

}

module.exports = {
  createRoom,
  getAllRooms,
  getRoomConversation,
  leaveRoom
};
