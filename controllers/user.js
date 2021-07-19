const User = require("../models/user");
const { decrypt } = require("../utils/encrypt");
const jwt = require("jsonwebtoken");
const config = require('../config')
const { validationResult } = require('express-validator');

module.exports = {
  register: async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw { message: errors.errors[0].msg };

        }
      let oldUser = await User.findOne({ email: req.body.email });
      if (oldUser) {
        throw { message: "User already exist." };
      }
      let newUser = new User(req.body);
      let result = await newUser.save();
      res.json({
        status: "success",
        message: "user registered successfully.",
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        message: (err && err.message) || "Oops! Failed to register user.",
      });
    }
  },

  login: async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
             throw { message: errors.errors[0].msg };
        }
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw { message: "Please check yoour email/password." };
      } else {
        let result = decrypt(req.body.password, user.password);
        if (result) {
          let jwtPayload = {
            _id: user._id,
            email: user.email,
          };
          user = user.toJSON();
          delete user['password']
          user.token = jwt.sign(jwtPayload, config.secret, {
            expiresIn: 60 * 60 * 24,
          });
          res.json({
            status: "success",
            message: "User logged in successfully.",
            data: user,
          });
        } else {
          throw { message: "Please check yoour email/password." };
        }
      }
    } catch (err) {
      res.status(400).json({
        message: (err && err.message) || "Oops! Failed to login.",
      });
    }
  },

  updateScore: async (req, res) => {
    
    try {
       let user = await User.findById(req.user._id)

      //  user.game_score.push(req.body.game_score)
       let updatedUser = await User.findByIdAndUpdate(req.user._id, {$push: {game_score: req.body}}, {new: true})

       res.json({
        status: "success",
        message: "User score updated successfully.",
        data: updatedUser,
      });
    } catch (error) {
      res.status(400).json({
        message: (err && err.message) || "Oops! Failed to update userscore.",
      });
    }


  },

   getUserData: async (req, res) => {
     try {
       let user = await User.findById(req.user._id)
       res.json({
         status:"success",
         data:user
       })
     } catch (error) {
      res.status(400).json({
        message: (err && err.message) || "Oops! Failed to get user.",
      });
     }
   }
};
