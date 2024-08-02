const express = require("express");

const router = express.Router();
const columnController = require("../../controller/columnController");

router.post("/", columnController.MoveColumns);

module.exports = router;
