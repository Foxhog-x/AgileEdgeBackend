const express = require("express");
const router = express.Router();

router.post("/create");
router.post("/delete");
router.post("/update");

module.exports = router;
