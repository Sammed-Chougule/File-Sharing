const router = require("express").Router();
const upload = require("../middleware/fileUploader");
const { fileUploader } = require("../controller/userController");

router.post("/", upload, fileUploader);

module.exports = router;
