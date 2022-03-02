const mongoose = require("mongoose");

const logger = require("../logger/logger");
const { MONGO_CONNECTION_URL } = require("../config/env");

const connectDB = async () => {
  try {
    const con = await mongoose
      .connect(MONGO_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    logger.info("connected", con);
  } catch (err) {
    throw new Error("connection failed");
  }
};

module.exports = connectDB;
