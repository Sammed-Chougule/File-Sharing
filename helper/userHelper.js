/* eslint-disable consistent-return */
const bcrypt = require("bcrypt");
const User = require("../models/user");
const logger = require("../utils/logger");
const { passwordMatch, userInfo } = require("../utils/index");
const {
  userExistErr,
  loginFail,
  loginSuccess,
  registerSuccess,
} = require("../utils/responder");

const registerHelper = async (req, res) => {
  try {
    // Checking if user exist in database
    const { userName, email } = req.body;
    const foundUser = await User.find({ $or: [{ userName }, { email }] });
    console.log(foundUser.length);
    if (foundUser.length !== 0) {
      return userExistErr(req, res);
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    User.create({
      ...await userInfo(req),
      password: hashPassword,
    });
    registerSuccess(req, res);
  } catch (error) {
    logger.error(`Error in userHelper:${error}`);
    return error;
  }
};

const loginHelper = async (req, res) => {
  const { userName } = req.body;
  const foundUser = await User.find({ userName });

  if (foundUser.length === 0) {
    return loginFail(req, res);
  }

  const passwordCheck = await passwordMatch(req, res);
  if (!passwordCheck) return passwordCheck(req, res);
  loginSuccess(req, res);
};
module.exports = { registerHelper, loginHelper };
