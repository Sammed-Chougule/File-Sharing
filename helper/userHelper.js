/* eslint-disable consistent-return */
const bcrypt = require("bcrypt");
const User = require("../models/user");
const generateToken = require("../utils/generateToken");
const logger = require("../utils/logger");
const userFind = require("../utils/userFind");

const registerHelper = async (req, res) => {
  try {
    const foundUser = userFind;
    if (foundUser.length === 0) {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      User.create({
        name: req.body.name,
        gender: req.body.gender,
        dob: req.body.dob,
        userName: req.body.userName,
        email: req.body.email,
        password: hashPassword,
      });

      res
        .json({ msg: `Registration successful for :${req.body.name} ` })
        .status(200);
    } else {
      res.json({ err: `${req.body.name} already exist` }).status(409);
    }
  } catch (error) {
    logger.error(error);
    return error;
  }
};

const loginHelper = async (req, res) => {
  const { userName } = req.body;
  const foundUser = await User.find({ userName });
  if (foundUser.length === 1) {
    const submittedPass = req.body.password;
    const storedPass = foundUser[0].password;
    const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
    if (passwordMatch) {
      res.json({
        name: foundUser[0].name,
        userName: foundUser[0].userName,
        token: generateToken(foundUser[0].userName),
      });
    } else {
      res.json({ msg: "Password Dont match" });
    }
  } else {
    res.json({ msg: "User doesnt exist" });
  }
};

module.exports = { registerHelper, loginHelper };
