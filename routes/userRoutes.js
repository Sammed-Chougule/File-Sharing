const router = require("express").Router();

const { fileUploader } = require("../controller/fileController");
const { userRegister, userLogin } = require("../controller/userController");
const upload = require("../middleware/fileUploader");
const auth = require("../middleware/jwtAuth");
const userValidation = require("../middleware/userValidation");
const regex = require("../middleware/userValidationRegex");

router.post("/upload", auth, upload, fileUploader);

router.post("/login", userLogin);

router.post("/register", regex, userRegister);

module.exports = router;
