const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage,
  limit: { fileSize: 1000000 * 100 },
}).single("file");

module.exports = upload;
