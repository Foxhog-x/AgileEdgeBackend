const express = require("express");
const addmemeberController = require("../../controller/addmemberController");

const router = express.Router();

router.post("/create", addmemeberController.addmember);

module.exports = router;
