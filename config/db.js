require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("../logger/createLogger");

function connectDB() {
  logger.info("Connecting...");
  mongoose
    .connect(process.env.MONGO_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conc) => {
      logger.info("MongoDB Connected");
    })
    .catch((err) => {
      logger.info(`Connection Failed `, err);
    });
}

module.exports = connectDB;
