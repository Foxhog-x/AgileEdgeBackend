const express = require("express");

const router = express.Router();
const columnController = require("../../controller/columnController");

router.post("/move", columnController.moveColumns);
router.delete("/delete", columnController.deleteColumn);
router.post("/add", columnController.addColumn);
router.put("/edit-title", columnController.editColumnName);

module.exports = router;
