const bcrypt = require("bcrypt");
const User = require("../models/user");
const generateToken = require("../utils/generateToken");
const logger = require("../utils/logger");

const registerHelper = async (req, res) => {
  try {
    const { userName, email } = req.body;
    const foundUser = await User.find({ $or: [{ userName }, { email }] });
    if (foundUser.length === 0) {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      User.create({
        name: req.body.name,
        gender: req.body.gender,
        dob: req.body.dob,
        userName: req.body.userName,
        email: req.body.email,
        password: hashPassword,
      });
      await User.find({ $or: [{ userName }, { email }] });

      res.json({ msg: "Registration successful" }).status(200);
    } else {
      res.json({ err: "User already exist" }).status(409);
    }
  } catch (error) {
    logger.error(error);
    return error;
  }
};

const loginHelper = async (req, res) => {
  const { userName } = req.body;
  const foundUser = await User.find({ userName });
  if (foundUser.length === 1) {
    const submittedPass = req.body.password;
    const storedPass = foundUser[0].password;
    const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
    if (passwordMatch) {
      res.json({
        name: foundUser[0].name,
        userName: foundUser[0].userName,
        token: generateToken(foundUser[0].userName),
      });
    } else {
      res.json({ msg: "Invalid username or password" });
    }
  } else {
    res.json({ msg: "user doesnt exit" });
  }
};

module.exports = { registerHelper, loginHelper };
