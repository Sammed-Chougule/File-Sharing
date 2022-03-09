const jsonwebtoken = require("jsonwebtoken");
const { ACCESS_TOKEN } = require("../config/env");

const auth = (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      // eslint-disable-next-line prefer-destructuring
      token = req.headers.authorization.split(" ")[1];
    }
    jsonwebtoken.verify(token, ACCESS_TOKEN, (error, data) => {
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
