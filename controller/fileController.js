const { USER_CONTROLLER } = require("../utils/constant");
const { saveFile } = require("../helper/fileHelper");
const logger = require("../utils/logger");

const fileUploader = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ error: USER_CONTROLLER.FILE_UPLOAD_ERROR_MSG });
    }

    // Store to database
    const fileData = await saveFile(
      req.body.filename,
      req.body.path,
      req.body.size,
    );

    if (fileData) {
      logger.info("succesfully uploaded");
    }
  } catch (err) {
    logger.error(`error occured while adding data:${err}`);
  }
  return res.send();
};

module.exports = { fileUploader };
