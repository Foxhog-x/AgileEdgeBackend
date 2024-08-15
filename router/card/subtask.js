const express = require("express");
const router = express.Router();
const cardController = require("../../controller/cardController");

router.post("/create", cardController.createSubTask);
router.get("/get", cardController.getSubTasks);
router.delete("/delete", cardController.deleteSubTasks);
router.put("/checked", cardController.updateSubTaskChecked);
module.exports = router;
