const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "/config/.env") });

const app = express();
const PORT = process.env.PORT || 3008;

const logger = require("./logger/createLogger");

app.use("/api/files", require("./routes/userRoutes"));

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
