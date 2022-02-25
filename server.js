const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

const connectDB = require("./config/db");
const logger = require("./logger/createLogger");

connectDB();

app.use("/api/files", require("./routes/userRoutes"));

app.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}`);
});
