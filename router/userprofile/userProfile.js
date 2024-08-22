const express = require("express");

const router = express.Router();
const myUserController = require("../../controller/myUserController");
router.post("/update-user-profile", myUserController.updateProfile);

module.exports = router;
