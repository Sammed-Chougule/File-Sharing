/* eslint-disable consistent-return */
const { registerHelper, loginHelper } = require("../helper/userHelper");

const userRegister = async (req, res) => {
  try {
    registerHelper(req, res);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const userLogin = async (req, res) => {
  try {
    loginHelper(req, res);
  } catch (error) {
    return res.json({ msg: "Internal server error" });
  }
};
module.exports = { userRegister, userLogin };
