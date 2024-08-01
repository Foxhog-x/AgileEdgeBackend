const express = require("express");

const router = express.Router();
const projectController = require("../../controller/projectController");

router.get("/getprojects", projectController.getAllProject);
router.post("/createproject", projectController.createProject);
router.delete("/deleteproject", projectController.deleteProject);
router.put("/editname", projectController.editname);
router.post("/fetchAllContents", projectController.getAllContents);

module.exports = router;
