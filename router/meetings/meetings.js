const express = require("express");
const router = express.Router();
const meetingsController = require("../../controller/mettingsController");
router.get("/get", meetingsController.getAll);
router.post("/create-event", meetingsController.createEvent);
router.put("/update-event", meetingsController.updateEvent);
router.delete("/delete-event", meetingsController.deleteEvent);
router.get("/today-events-list", meetingsController.todaysEventList);

module.exports = router;
