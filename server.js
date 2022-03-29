const express = require("express");

const { PORT } = require("./config/env");
const connectDB = require("./utils/db");

const app = express();

const logger = require("./utils/logger");

app.use(express.json());
app.use("/user", require("./routes/userRoutes"));
app.use("/file", require("./routes/fileRoutes"));

connectDB().catch((error) => {
  logger.error(error);
});

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
