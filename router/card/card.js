const express = require("express");
const router = express.Router();
const cardController = require("../../controller/cardController");

router.post("/create", cardController.createCard);
router.post("/delete", cardController.deleteCard);
router.put("/edit-title", cardController.editCardTitle);
router.post("/move-external", cardController.moveCardExternal);
router.post("/move-internal", cardController.moveCardInternal);
router.post("/assign-memeber-to-card", cardController.assignMemeberToCard);
router.post(
  "/dissociate-memeber-to-card",
  cardController.dissociateMemberToCard
);

module.exports = router;
