/* eslint-disable consistent-return */
const { responder } = require("../utils/responder");

const regex = (req, res, next) => {
  try {
    const name = /^[a-zA-Z ]{2,30}$/;
    const gender = /^male$|^female$|^other$/;
    const dob = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    const userName = /^[a-zA-Z ]{2,30}$/;
    const email = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    if (!name.test(req.body.name)) {
      return responder(400, "Write name in correct format", res);
    }

    if (!gender.test(req.body.gender)) {
      return responder(400, "Write gender in correct format", res);
    }

    if (!dob.test(req.body.dob)) {
      return responder(400, "Write dob in correct format", res);
    }
    if (!userName.test(req.body.userName)) {
      return responder(400, "Write userName in correct format", res);
    }
    if (!email.test(req.body.email)) {
      return responder(400, "Write email in correct format", res);
    }
    if (!password.test(req.body.password)) {
      return responder(400, "Write password in correct format", res);
    }
    if (req.body.password !== req.body.confirmPassword) {
      return responder(400, "Password doesn't match", res);
    }
    next();
  } catch (error) {
    return res.json(error);
  }
};

module.exports = regex;
