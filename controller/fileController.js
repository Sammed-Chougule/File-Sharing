// TODO: change name
const { USER_CONTROLLER } = require("../utils/constant");
const saveFile = require("../helper/fileHelper");
const logger = require("../utils/logger");

// TODO devDependencies, dependencies

const fileUploader = async (req, res) => {
  try {
    // TODO 2. Space configuration in eslint,
    if (!req.file) {
      return res.json({ error: USER_CONTROLLER.FILE_UPLOAD_ERROR_MSG });
    }

    // TODO 3. Comment should start with capital letter
    // store to database
    const fileData = saveFile(req);
    // TODO 4. Move database function to a helper file
    if (fileData) {
      logger.info("succesfully uploaded");
    }
  } catch (err) {
    logger.error(`error occured while adding data:${JSON.stringify(err.err)}`);
  }
  return res.send();
};

module.exports = { fileUploader };
