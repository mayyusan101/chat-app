const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10; // the more greater, the more it longs
const { generateAccessToken } = require("../config/token");


const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const loginUser = await User.findOne({ email: email });
    if (!loginUser) {
      res.status(404).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, loginUser.password);
    if (!isMatch) {
      res.status(404).json({ message: "Invalid email or password" });
    }
    const newToken = generateAccessToken(loginUser.email);
    const updatedUser = await User.findOneAndUpdate({ _id: loginUser._id}, { token: newToken }, { new: true });
    res.status(200).json({message:"Login success", data:{user: updatedUser,token: newToken }});
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    error.message = "Can't login account";
    return next(error);
  }
};

const register = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  if (!name || !email || !password) {
    return next(new Error('Name and email are required!', 422));
  }
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
    // hash password
    const hashedPasswrod = await bcrypt.hash(password, saltRounds);
    const token =  generateAccessToken(email);
    const userData = {
      name,
      email,
      password: hashedPasswrod,
      token: token
    };
    const user = await User.create(userData);
    res.status(201).json({ message: "Register success", data:{user: user,token: user.token} });
    } else {
      return next(new Error('User already exists!', 422));
    }
  }catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    error.message = "Can't create account";
    return next(error);
  };
};

module.exports = {
  login,
  register,
};
