const mongoose = require("mongoose");

const logger = require("../logger/createLogger");

const connectDB = async () => {
  try {
    const con = await mongoose
      .connect(process.env.MONGO_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    logger.info("connected", con);
  } catch (err) {
    throw new Error("connection failed");
  }
};

module.exports = connectDB;
