const {
  nameFormatErr,
  confPasswordFormatErr,
  passwordFormatErr,
  emailFormatErr,
  userNameFormatErr,
  dobFormatErr,
  genderFormatErr,
} = require("../utils/responder");

const regex = (req, res, next) => {
  try {
    const name = /^[a-zA-Z ]{2,30}$/;
    const gender = /^male$|^female$|^other$/;
    const dob = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    const userName = /^[a-zA-Z ]{2,30}$/;
    const email = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    const password =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    if (!name.test(req.body.name)) {
      return nameFormatErr(res);
    }

    if (!gender.test(req.body.gender)) {
      return genderFormatErr(res);
    }

    if (!dob.test(req.body.dob)) {
      return dobFormatErr(res);
    }
    if (!userName.test(req.body.userName)) {
      return userNameFormatErr(res);
    }
    if (!email.test(req.body.email)) {
      return emailFormatErr(res);
    }
    if (!password.test(req.body.password)) {
      return passwordFormatErr(res);
    }
    if (req.body.password !== req.body.confirmPassword) {
      return confPasswordFormatErr(res);
    }
    next();
  } catch (error) {
    return res.json(error);
  }
};

module.exports = regex;
