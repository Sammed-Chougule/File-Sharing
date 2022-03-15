const jsonwebtoken = require("jsonwebtoken");
const { ACCESS_TOKEN } = require("../config/env");

const auth = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      // eslint-disable-next-line prefer-destructuring
      token = req.headers.authorization[1];
    }
    await jsonwebtoken.verify(token, ACCESS_TOKEN);
    next();
  } catch (error) {
    res.json({ error });
  }
};

module.exports = auth;
