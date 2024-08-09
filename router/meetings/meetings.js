const express = require("express");
const router = express.Router();
const meetingsController = require("../../controller/mettingsController");
router.get("/get", meetingsController.getAll);
router.post("/create-event", meetingsController.createEvent);

module.exports = router;
