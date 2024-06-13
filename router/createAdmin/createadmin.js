const express = require("express");
const router = express.Router();
const createAdminController = require("../../controller/createadminController");

router.post("/", createAdminController.createAdmin);

module.exports = router;
