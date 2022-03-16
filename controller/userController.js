/* eslint-disable consistent-return */
const { registerHelper, loginHelper } = require("../helper/userHelper");
const logger = require("../utils/logger");

const userRegister = async (req, res) => {
  try {
    registerHelper(req, res);
  } catch (error) {
    return logger.error(`Error in userRegisterController:${error}`);
  }
};

const userLogin = async (req, res) => {
  try {
    loginHelper(req, res);
  } catch (error) {
    return logger.error(`Error in userLoginController:${error}`);
  }
};
module.exports = { userRegister, userLogin };
