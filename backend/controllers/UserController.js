const User = require("../models/user");

const getAllUsers = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const users = await User.find({ _id: { $ne: currentUser._id } });
    res.status(200).json({ message: "success", data: { users: users } });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAllUsers,
};
