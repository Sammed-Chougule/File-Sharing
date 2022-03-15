const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });
module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_CONNECTION_URL: process.env.MONGO_CONNECTION_URL,
  SIZE: process.env.SIZE || 1000000 * 100,
  PORT: process.env.PORT || 3010,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
};
