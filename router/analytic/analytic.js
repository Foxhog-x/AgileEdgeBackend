const express = require("express");

const router = express.Router();
const analyticController = require("../../controller/analyticsController");

router.get("/get-task-progress", analyticController.getTaskProgress);
router.get("/get-task-analytics", analyticController.getAnalytics);

module.exports = router;
