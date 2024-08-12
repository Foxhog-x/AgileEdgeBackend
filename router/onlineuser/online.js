const express = require("express");
const router = express.Router();
const onlineuserController = require("../../controller/onlineuserController");

router.get("/", onlineuserController.fetchOnline);

module.exports = router;
