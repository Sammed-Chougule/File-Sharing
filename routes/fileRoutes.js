const router = require("express").Router();
const { fileUploader } = require("../controller/fileController");
const upload = require("../middleware/fileUploader");
const auth = require("../middleware/jwtAuth");

router.post("/upload", auth, upload, fileUploader);

module.exports = router;
