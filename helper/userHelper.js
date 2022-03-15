const bcrypt = require("bcrypt");
const User = require("../models/user");
const generateToken = require("../utils/auth");
const logger = require("../utils/logger");
const { passwordMatch } = require("../utils/index");

const registerHelper = async (req, res) => {
  const userData = {
    name: req.body.name,
    gender: req.body.gender,
    dob: req.body.dob,
    userName: req.body.userName,
    email: req.body.email,
  };
  try {
    // Checking if user exist in database
    const { userName, email } = req.body;
    const foundUser = await User.find({ $or: [{ userName }, { email }] });
    if (foundUser.length !== 0) {
      return res
        .status(409)
        .json({ err: `User with userName ${req.body.userName} already exist` });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    User.create({
      ...userData,
      password: hashPassword,
    });

    res
      .json({
        msg: "Registration successful for user ",
        data: {
          ...userData,
        },
      })
      .status(200);
  } catch (error) {
    logger.error(`Error in userHelper:${error}`);
    return error;
  }
};

const loginHelper = async (req, res) => {
  const { userName } = req.body;
  const foundUser = await User.find({ userName });

  if (foundUser.length === 0) {
    return res.status(400).send("userName not exist");
  }

  const passwordCheck = await passwordMatch(req, res);
  if (!passwordCheck) return res.status(400).send("Password don't match");
  res.json({
    name: foundUser[0].name,
    userName: foundUser[0].userName,
    token: generateToken(foundUser[0].userName),
  });
};
module.exports = { registerHelper, loginHelper };
