/* eslint-disable consistent-return */
const { USER_CONTROLLER } = require("../utils/constant");
const { saveFile } = require("../helper/fileHelper");
const logger = require("../utils/logger");

const fileUploader = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ error: USER_CONTROLLER.FILE_UPLOAD_ERROR_MSG });
    }

    // store to database
    const fileData = await saveFile(req);

    if (fileData) {
      logger.info("succesfully uploaded");
    }
  } catch (err) {
    logger.error(`error occured while adding data:${err}`);
  }
};

module.exports = { fileUploader };
