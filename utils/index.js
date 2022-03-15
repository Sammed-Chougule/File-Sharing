const bcrypt = require("bcrypt");
const User = require("../models/user");

const passwordMatch = async (req) => {
  const { userName } = req.body;
  const foundUser = await User.find({ userName });
  const submittedPass = req.body.password;
  const storedPass = foundUser[0].password;

  return bcrypt.compare(submittedPass, storedPass);
};

module.exports = { passwordMatch };
