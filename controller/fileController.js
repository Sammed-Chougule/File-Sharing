// TODO: change name
const { USER_CONTROLLER } = require("../utils/constant");
const logger = require("../utils/logger");
const file = require("../helper/fileHelper");

// TODO devDependencies, dependencies

const fileUploader = async (req, res) => {
  try {
    // TODO 2. Space configuration in eslint,
    if (!req.file) {
      return res.json({ error: USER_CONTROLLER.FILE_UPLOAD_ERROR_MSG });
    }

    // TODO 3. Comment should start with capital letter

    // TODO 4. Move database function to a helper file

    await file.save();
  } catch (err) {
    logger.error(`error occured while adding data:${JSON.stringify(err.err)}`);
  }
  return res.send();
};

module.exports = { fileUploader };
