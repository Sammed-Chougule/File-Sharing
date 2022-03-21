const { v4: uniqueStart } = require("uuid");
const File = require("../models/file");
const logger = require("../utils/logger");

const saveFile = async (filename, path, size) => {
  try {
    const file = new File({
      filename,
      uuid: uniqueStart(),
      path,
      size,
    });
    file.save();
    return file;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

module.exports = { saveFile };
