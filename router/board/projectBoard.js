const express = require("express");

const router = express.Router();
const projectController = require("../../controller/projectController");

router.get("/get-projects", projectController.getAllProject);
router.post("/create-project", projectController.createProject);
router.delete("/delete-project", projectController.deleteProject);
router.put("/edit-name", projectController.editname);
router.post("/fetch-all-contents", projectController.getAllContents);

module.exports = router;
