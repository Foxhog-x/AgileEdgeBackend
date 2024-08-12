require("dotenv/config");
const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_PRIVATE_KEY;
const jwtVerify = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log("error");
      res.status(500).json({ error: "error occured" });
    }
    jwt.verify(token, privateKey, (err, user) => {
      if (err) return res.sendStatus(403);

      req.user = user;
      next();
    });
  }
};

module.exports = jwtVerify;
