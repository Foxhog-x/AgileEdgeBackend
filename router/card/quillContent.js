const express = require("express");
const router = express.Router();
const quillController = require("../../controller/quillController");
router.post("/get-description", quillController.getQuillData);
router.post("/description", quillController.addContent);

module.exports = router;
