import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';

import User from '../models/User.js';

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  //check if authorization header exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Retrieve the user from the database using the decoded ID
      const user = await User.findById(decoded.id).select('-password');

      // Validate if the user exists and the token's ID matches the user's ID
      if (user && decoded.id === user._id.toString()) {
        req.user = user; // Save the user object in the request
        next();
      } else {
        res.status(401);
        throw new Error('Not authorized, invalid token');
      }
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not Authorized, token failed');
    }
  } else {
    if (!token) {
      res.status(401);
      throw new Error('Not Authorized, no token');
    }
  }
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not Authorized as an admin');
  }
};
export {protect, isAdmin};
