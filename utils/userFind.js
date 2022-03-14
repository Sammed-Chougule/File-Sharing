const User = require("../models/user");

const userFind = (req) => {
  const { userName, email } = req.body;
  return User.find({ $or: [{ userName }, { email }] });
};

module.exports = userFind;
