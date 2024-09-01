const express = require("express");
const router = express.Router();
const aiController = require("../../controller/aiController");

router.post("/summary", aiController.genrateSummary);

module.exports = router;
