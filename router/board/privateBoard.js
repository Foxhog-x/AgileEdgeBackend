const express = require("express");
const router = express.Router();
const privateBoardController = require("../../controller/privateboardController");

router.post("/create/private", privateBoardController.create_board);
router.post("/delete/private", privateBoardController.delete_board);
router.post("/update/private", privateBoardController.update_board);
router.post("/fetch/private", privateBoardController.fetch_board);

module.exports = router;
