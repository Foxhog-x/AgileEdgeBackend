const express = require("express");
const router = express.Router();
const cardController = require("../../controller/cardController");

router.post("/fetch", cardController.fetchCard);
router.post("/create", cardController.createCard);
router.post("/delete", cardController.deleteCard);
router.post("/update", cardController.updateCard);

module.exports = router;
