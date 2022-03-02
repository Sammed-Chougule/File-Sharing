const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "/config/.env") });
const { PORT } = require("./config/env");
const connectDB = require("./utils/db");

const app = express();

const logger = require("./logger/logger");

app.use("/api/files", require("./routes/userRoutes"));

connectDB().catch((error) => {
  logger.error(error);
});

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
