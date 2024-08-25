const express = require("express");

const router = express.Router();
const analyticController = require("../../controller/analyticsController");

router.get("/get-task-progress", analyticController.getTaskProgress);
router.get("/get-task-by-col", analyticController.getTaskDistributionByCol);
router.get(
  "/get-task-total-by-priority",
  analyticController.getTaskCountByPriority
);
module.exports = router;
