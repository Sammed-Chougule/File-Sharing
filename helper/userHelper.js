/* eslint-disable consistent-return */
const bcrypt = require("bcrypt");
const User = require("../models/user");
const logger = require("../utils/logger");
const { passwordMatch, userInfo } = require("../utils/index");
const { responder } = require("../utils/responder");
const generateToken = require("../utils/auth");

const registerHelper = async (req, res) => {
  try {
    // Checking if user exist in database
    const { userName, email } = req.body;
    const foundUser = await User.find({ $or: [{ userName }, { email }] });
    if (foundUser.length !== 0) {
      return responder(
        409,
        `User with userName ${req.body.userName} already exist`,
        res,
      );
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    User.create({
      ...(await userInfo(req)),
      password: hashPassword,
    });
    responder(
      200,
      "Registration successful for user",
      res,
      await userInfo(req),
    );
  } catch (error) {
    logger.error(`Error in registerHelper:${error}`);
    return error;
  }
};

const loginHelper = async (req, res) => {
  try {
    const { userName } = req.body;
    const foundUser = await User.find({ userName });

    if (foundUser.length === 0) {
      return responder(400, "User doesn't exist", res);
    }

    const passwordCheck = await passwordMatch(req, res);
    if (!passwordCheck) return passwordCheck(req, res);
    responder(400, res, "Login successfull for user", {
      name: foundUser[0].name,
      userName: foundUser[0].userName,
      token: generateToken(foundUser[0].userName),
    });
  } catch (error) {
    logger.error(`Error in loginHelper:${error}`);
  }
};
module.exports = { registerHelper, loginHelper };
