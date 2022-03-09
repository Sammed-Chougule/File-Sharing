const router = require("express").Router();

const { fileUploader } = require("../controller/fileController");
const { userRegister, userLogin } = require("../controller/userController");
const upload = require("../middleware/fileUploader");
const auth = require("../middleware/jwtAuth");
const userValidation = require("../middleware/userValidation");

router.post("/upload", auth, upload, fileUploader);

router.post("/login", userLogin);

router.post("/register", userValidation, userRegister);

module.exports = router;
