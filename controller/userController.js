const File = require("../models/fileModel");
const { v4: uuidv4 } = require("uuid");

const fileUploader = async (req, res) => {
  if (!req.file) {
    return res.json({ error: "All fields are required" });
  }

  //store to database
  const file = new File({
    filename: req.file.filename,
    uuid: uuidv4(),
    path: req.file.path,
    size: req.file.size,
  });

  const response = await file
    .save()
    .then((data) => {
      res.status(200).json({ data: data });
    })
    .catch((err) => {
      logger.error(
        `error occured while adding data:${JSON.stringify(err.err)}`
      );
    });
};

module.exports = { fileUploader };
