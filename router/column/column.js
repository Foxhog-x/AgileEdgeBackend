const express = require("express");

const router = express.Router();
const columnController = require("../../controller/columnController");

router.post("/move", columnController.moveColumns);
router.put("/edit", columnController.editColumn);
router.delete("/delete", columnController.deleteColumn);
router.post("/add", columnController.addColumn);

module.exports = router;
