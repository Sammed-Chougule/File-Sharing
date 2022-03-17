/* eslint-disable consistent-return */
const index = require("../utils/index");
const generateToken = require("../utils/auth");
const logger = require("../utils/logger");
const { responder } = require("../utils/responder");
const userHelper = require("../helper/userHelper");

const loginService = async (req, res) => {
  try {
    const foundUser = await userHelper.userCheck(req);

    if (foundUser.length === 0) {
      return responder(400, "User doesn't exist", res);
    }

    const passwordCheck = await index.passwordMatch(req, res);
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

const registerService = async (req, res) => {
  try {
    // Checking if user exist in database
    const foundUser = await userHelper.userFind(req);
    if (foundUser.length !== 0) {
      return responder(
        409,
        `User with userName ${req.body.userName} already exist`,
        res,
      );
    }
    // Creating new user in Database
    userHelper.userCreate(req);
    responder(
      200,
      "Registration successful for user",
      res,
      await index.userInfo(req),
    );
  } catch (error) {
    logger.error(`Error in registerHelper:${error}`);
    return error;
  }
};

module.exports = { loginService, registerService };
