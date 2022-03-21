/* eslint-disable consistent-return */
const index = require("../utils/index");
const generateToken = require("../utils/auth");
const logger = require("../utils/logger");
const userHelper = require("../helper/userHelper");

const loginService = async (userName, password) => {
  try {
    const foundUser = await userHelper.userCheck(userName);
    if (foundUser.length === 0) {
      throw new Error("User doesn't exist");
    }

    const passwordCheck = await index.passwordMatch(userName, password);
    if (!passwordCheck) {
      throw new Error("Password Don't Match");
    }
    const userData = {
      name: foundUser[0].name,
      userName: foundUser[0].userName,
      token: generateToken(foundUser[0].userName),
    };

    return userData;
  } catch (error) {
    logger.error(`Error in loginService:${error}`);
    return new Error(error);
  }
};

const registerService = async (userData) => {
  try {
    // Checking if user exist in database
    const foundUser = await userHelper.userFind(
      userData.userName,
      userData.email,
    );
    if (foundUser.length !== 0) {
      throw new Error(`User with userName ${userData.userName} already exist`);
    }
    // Creating new user in Database
    await userHelper.userCreate(userData);
    return userData;
  } catch (error) {
    logger.error(`Error in registerService:${error}`);
    return new Error(error);
  }
};

module.exports = { loginService, registerService };
