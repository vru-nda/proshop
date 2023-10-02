import asyncHandler from 'express-async-handler'; //handles the exceptions/errors in express routes
import generateToken from '../utils/generateToken.js';

import User from '../models/User.js';

// @desc   Register a new user
// @route  POST /api/users
// @acesss Public
const registerUser = asyncHandler(async (req, res) => {
  const {email, password, name} = req.body;
  const userExists = await User.findOne({email});
  if (userExists) {
    res.status(400);
    throw new Error('User already exists.');
  }

  const user = await User.create({name, email, password});
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

// @desc   Auth user & get token
// @route  POST /api/users/login
// @acesss Public
const authUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc   Get user profile
// @route  POST /api/users/profile
// @acesss Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc   Update user profile
// @route  POST /api/users/profile
// @acesss Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body;
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// *********** Admin controllers *************//

// @desc   Get user by id
// @route  GET /api/users/id
// @acesss Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    throw new Error('User not found');
  }
});

// @desc   Update user
// @route  PUT /api/users/:id
// @acesss Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const {name, email, isAdmin} = req.body;

  const user = await User.findById(req.params.id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = isAdmin;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc   Get users list
// @route  GET /api/users
// @acesss Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc   Delete a user
// @route  DELETE /api/users/:id
// @acesss Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({message: 'User removed!'});
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

export {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
};
