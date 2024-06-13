const express = require("express");
const router = express.Router();
const publicBoardController = require("../../controller/publicboardController");

router.post("/create/public", publicBoardController.create_board);
router.post("/delete/public", publicBoardController.delete_board);
router.post("/update/public", publicBoardController.update_board);
router.post("/fetch/public", publicBoardController.fetch_board);

module.exports = router;
