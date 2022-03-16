const { userInfo } = require("./index");
const User = require("../models/user");
const generateToken = require("./auth");

const userExistErr = (req, res) => {
  res.status(409).send(`User with userName ${req.body.userName} already exist`);
};

const passwordCheck = (req, res) => {
  res.status(400).send("Password doesn't match");
};

const loginFail = (req, res) => {
  res.status(400).send("User doesn't exist");
};

const loginSuccess = async (req, res) => {
  const { userName } = req.body;
  const foundUser = await User.find({ userName });
  res.json({
    name: foundUser[0].name,
    userName: foundUser[0].userName,
    token: generateToken(foundUser[0].userName),
  });
};

const registerSuccess = (req, res) => {
  res.status(200).json({
    msg: "Registration successful for user",
    data: {
      ...userInfo(req),
    },
  });
};

const nameFormatErr = (res) => {
  res.status(400).send("Write name in correct format");
};
const genderFormatErr = (res) => {
  res.status(400).send("Write gender in correct format");
};
const dobFormatErr = (res) => {
  res.status(400).send("Write dob in correct format");
};
const userNameFormatErr = (res) => {
  res.status(400).send("Write userName in correct format");
};
const emailFormatErr = (res) => {
  res.status(400).send("Write email in correct format");
};
const passwordFormatErr = (res) => {
  res.status(400).send("Write password in correct format");
};
const confPasswordFormatErr = (res) => {
  res.status(400).send("Password don't match");
};

module.exports = {
  registerSuccess,
  loginFail,
  loginSuccess,
  nameFormatErr,
  genderFormatErr,
  dobFormatErr,
  userNameFormatErr,
  emailFormatErr,
  passwordFormatErr,
  confPasswordFormatErr,
  passwordCheck,
  userExistErr,
};
