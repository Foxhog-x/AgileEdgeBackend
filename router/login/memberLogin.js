const express = require("express");
const router = express.Router();
const loginController = require("../../controller/login/loginController");

router.post("/login", loginController.memberLogin);

module.exports = router;
