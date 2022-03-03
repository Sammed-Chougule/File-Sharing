const req = require("express/lib/request");
const { v4: uniqueStart } = require("uuid");
const File = require("../models/file");

const file = new File({
  filename: req.file.filename,
  uuid: uniqueStart(),
  path: req.file.path,
  size: req.file.size,
});

module.exports = file;
