const express = require("express");

const router = express.Router();

router.post("/add", (req, res) => {
  console.log(req.user);
});
module.exports = router;
