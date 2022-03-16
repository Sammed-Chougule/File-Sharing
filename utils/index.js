const bcrypt = require("bcrypt");
const User = require("../models/user");

const passwordMatch = async (req) => {
  const { userName } = req.body;
  const foundUser = await User.find({ userName });
  const submittedPass = req.body.password;
  const storedPass = foundUser[0].password;

  return bcrypt.compare(submittedPass, storedPass);
};

const userInfo = async (req) => {
  const userData = {
    name: req.body.name,
    gender: req.body.gender,
    dob: req.body.dob,
    userName: req.body.userName,
    email: req.body.email,
  };
  return userData;
};

module.exports = { passwordMatch, userInfo };
