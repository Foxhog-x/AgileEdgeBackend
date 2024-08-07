require("dotenv/config");
const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_PRIVATE_KEY;
const socketAuth = (socket, next) => {
  const token = socket.handshake.query.token;
  jwt.verify(token, privateKey, (err, user) => {
    if (err) return res.sendStatus(403);
    socket.user = user;
    next();
  });
};

module.exports = socketAuth;
