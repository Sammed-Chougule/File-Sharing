const router = require("express").Router();

const { fileUploader } = require("../controller/fileController");
const { userRegister, userLogin } = require("../controller/userController");
const upload = require("../middleware/fileUploader");
const userValidation = require("../middleware/userValidation");

router.post("/upload", upload, fileUploader);

router.post("/login", userLogin);

router.post("/register", userValidation, userRegister);

module.exports = router;
