/* eslint-disable consistent-return */
const { loginService, registerService } = require("../service/userService");
const logger = require("../utils/logger");

const userRegister = async (req, res) => {
  try {
    registerService(req, res);
  } catch (error) {
    return logger.error(`Error in userRegisterController:${error}`);
  }
};

const userLogin = async (req, res) => {
  try {
    loginService(req, res);
  } catch (error) {
    return logger.error(`Error in userLoginController:${error}`);
  }
};
module.exports = { userRegister, userLogin };
