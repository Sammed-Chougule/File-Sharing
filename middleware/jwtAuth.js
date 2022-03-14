const jsonwebtoken = require("jsonwebtoken");
const { ACCESS_TOKEN } = require("../config/env");

const auth = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      // eslint-disable-next-line prefer-destructuring
      token = req.headers.authorization[1];
    }
    await jsonwebtoken.verify(token, ACCESS_TOKEN, (error, data) => {
      if (error) {
        res.json(error).status(402);
      }
      req.user = data;
      next();
    });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = auth;
