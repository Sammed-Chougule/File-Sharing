/* eslint-disable consistent-return */
const bcrypt = require("bcrypt");
const User = require("../models/user");
const index = require("../utils/index");

const userCheck = async (req) => {
  const { userName } = req.body;
  return User.find({ userName });
};

const userFind = async (req) => {
  const { userName, email } = req.body;
  return User.find({ $or: [{ userName }, { email }] });
};

const userCreate = async (req) => {
  const hashPassword = await bcrypt.hash(req.body.password, 10);

  return User.create({
    ...(await index.userInfo(req)),
    password: hashPassword,
  });
};

module.exports = { userCheck, userFind, userCreate };
