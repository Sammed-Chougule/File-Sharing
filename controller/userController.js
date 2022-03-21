/* eslint-disable consistent-return */
const { loginService, registerService } = require("../service/userService");
const { userInfo } = require("../utils");
const logger = require("../utils/logger");

const userRegister = async (req, res) => {
  try {
    const userData = { ...(await userInfo(req)), password: req.body.password };

    registerService(userData, res);
  } catch (error) {
    return logger.error(`Error in userRegisterController:${error}`);
  }
};

const userLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    loginService(userName, password, res);
  } catch (error) {
    return logger.error(`Error in userLoginController:${error}`);
  }
};
module.exports = { userRegister, userLogin };
