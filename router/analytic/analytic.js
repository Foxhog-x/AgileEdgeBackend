const express = require("express");

const router = express.Router();
const analyticController = require("../../controller/analyticsController");

router.get("/get-task-progress", analyticController.getTaskProgress);

module.exports = router;
