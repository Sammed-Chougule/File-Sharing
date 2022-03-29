/* eslint-disable consistent-return */
const { loginService, registerService } = require("../service/userService");
const { userInfo } = require("../utils");
const logger = require("../utils/logger");
const { responder } = require("../utils/responder");

const userRegister = async (req, res) => {
  try {
    const userData = { ...(await userInfo(req)), password: req.body.password };
    const user = await registerService(userData);
    if (!user.message) {
      responder(200, "Registration successful for user", res, user);
    }
    responder(400, user.message, res);
  } catch (error) {
    logger.error(`Error in userRegisterController:${error}`);
    responder(400, error.message, res);
  }
};

const userLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await loginService(userName, password);

    if (user.message) {
      throw new Error(user.message);
    }
    responder(200, "Login successfull for user", res, user);
  } catch (error) {
    logger.error(`Error in userLoginController:${error}`);
    responder(400, error.message, res);
  }
};
module.exports = { userRegister, userLogin };
