import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @acces   Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    //Set JWT as http-only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "developement",
      sameSite: "strict",
      maxAge: 30 * 24 * 3600 * 1000, //30 days in mili seconds
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register user
// @route   POST /api/users
// @acces   Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @acces   Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @acces   Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @acces   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

// @desc    Get users
// @route   GET /api/users
// @acces   Private/ADMIN
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @acces   Private/ADMIN
const getUserByID = asyncHandler(async (req, res) => {
  res.send("get user by ID");
});

// @desc    Delete users
// @route   DELETE /api/users
// @acces   Private/ADMIN
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

// @desc    Update user
// @route   PUT /api/users/:id
// @acces   Private/ADMIN
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
};
