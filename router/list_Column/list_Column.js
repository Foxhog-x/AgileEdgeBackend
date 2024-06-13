const express = require("express");
const listColumnController = require("../../controller/listcolumnController");

const router = express.Router();

router.post("/create", listColumnController.createList);
router.post("/delete", listColumnController.fetchList);
router.post("/fetch", listColumnController.fetchList);

module.exports = router;
