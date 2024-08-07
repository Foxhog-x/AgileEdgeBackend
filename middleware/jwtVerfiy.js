require("dotenv/config");
const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_PRIVATE_KEY;
const jwtVerify = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (!token) res.status(500).json({ error: "error occured" });
  jwt.verify(token, privateKey, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log(user);
    req.user = user;
    next();
  });
};

module.exports = jwtVerify;
