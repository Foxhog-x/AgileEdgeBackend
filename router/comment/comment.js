const express = require("express");
const router = express.Router();
const commentController = require("../../controller/commentController");

router.get("/get-comments", commentController.getComments);

module.exports = router;
