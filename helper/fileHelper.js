const { v4: uniqueStart } = require("uuid");
const File = require("../models/file");
const logger = require("../utils/logger");

const saveFile = async (req) => {
  try {
    const file = new File({
      filename: req.file.filename,
      uuid: uniqueStart(),
      path: req.file.path,
      size: req.file.size,
    });
    file.save();
    return file;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

module.exports = { saveFile };
