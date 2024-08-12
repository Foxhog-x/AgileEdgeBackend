const express = require("express");
const router = express.Router();
const loginController = require("../../controller/loginController");
router.post("/create-member", loginController.createMember);
router.post("/login", loginController.memberLoign);

module.exports = router;
