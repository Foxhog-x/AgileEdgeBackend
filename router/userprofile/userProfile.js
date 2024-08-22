const express = require("express");

const router = express.Router();
const myUserController = require("../../controller/myUserController");
router.post("/update-user-profile", myUserController.updateProfile);
router.get("/get-profile", myUserController.getProfile);

module.exports = router;
