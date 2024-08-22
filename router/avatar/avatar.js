const express = require("express");

const router = express.Router();
const avatarController = require("../../controller/avatarController");
router.get("/fetch-avatars", avatarController.fetchMembersAvatar);
router.get("/fetch-user-avatar", avatarController.fetchUserAvatar);

module.exports = router;
