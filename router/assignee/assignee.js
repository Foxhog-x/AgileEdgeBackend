const express = require("express");

const router = express.Router();
const assigneeController = require("../../controller/assigneeController");

router.post("/get-assign-members", assigneeController.getAssignee);
router.post("/update-assign", assigneeController.addAssignee);
router.delete("/delete-assignee", assigneeController.removeAssignee);

module.exports = router;
