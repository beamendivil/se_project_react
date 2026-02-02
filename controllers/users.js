// controllers/users.js
// User controllers: getUsers, getUser, createUser

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { JWT_SECRET } from "../utils/config.js";
import {
  INVALID_DATA_ERROR,
  NOT_FOUND_ERROR,
  UNAUTHORIZED_ERROR,
  CONFLICT_ERROR,
} from "../utils/errors.js";

export const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

export const getUser = (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next({ statusCode: INVALID_DATA_ERROR, message: 'Invalid user id' });
  }

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return next({ statusCode: NOT_FOUND_ERROR, message: 'User not found' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next({ statusCode: INVALID_DATA_ERROR, message: 'Invalid data' });
      }
      return next(err);
    });
};

export const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(201).send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next({ statusCode: CONFLICT_ERROR, message: "Email already exists" });
      }

      if (err.name === "ValidationError") {
        return next({
          statusCode: INVALID_DATA_ERROR,
          message: "Invalid data when creating user",
        });
      }

      return next(err);
    });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next({
      statusCode: INVALID_DATA_ERROR,
      message: "Email and password are required",
    });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() =>
      next({
        statusCode: UNAUTHORIZED_ERROR,
        message: "Incorrect email or password",
      })
    );
};

export const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next({ statusCode: NOT_FOUND_ERROR, message: "User not found" });
      }
      return res.send(user);
    })
    .catch(next);
};

export const updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next({ statusCode: NOT_FOUND_ERROR, message: "User not found" });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next({ statusCode: INVALID_DATA_ERROR, message: "Invalid data" });
      }
      return next(err);
    });
};

