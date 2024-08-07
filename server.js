const express = require("express");

const socket = require("socket.io");
const app = express();
const cors = require("cors");
const jwtVerify = require("./middleware/jwtVerfiy.js");
const socketAuth = require("./middleware/socketAuth.js");

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
const expressServer = app.listen(8000, () => {
  console.log("port is listening on 8000");
});

const io = socket(expressServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    Credential: true,
  },
});

const namespaces = {};
io.use(socketAuth);
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("join card", (data) => {
    const { cardId } = data;
    const { member_name } = socket.user;

    if (!namespaces[cardId]) {
      namespaces[cardId] = io.of(`/card/${cardId}`);
      namespaces[cardId].on("connection", (nsSocket) => {
        console.log(`${member_name} connected to /card/${cardId}`);

        nsSocket.join(cardId);
        nsSocket.to(cardId).emit("user joined", { userName: member_name });

        nsSocket.on("chat message", (msg) => {
          console.log(msg);
          namespaces[cardId].to(cardId).emit("chat message", {
            message: msg,
            userName: member_name,
            date: Date.now(),
          });
        });

        nsSocket.on("disconnect", () => {
          nsSocket.to(cardId).emit("user left", { userName: member_name });
          console.log(`${member_name} disconnected from /card/${cardId}`);
        });
      });
    }
    socket.emit("connect to namespace", `http://localhost:8000/card/${cardId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(express.json());
app.use("/member", require("./router/login/login.js"));
app.use(jwtVerify);
// app.get("/jwt", (req, res) => {
//   res.json({ message: "success" });
// });

app.use("/member", require("./router/login/login.js"));
app.use("/createadmin", require("./router/createAdmin/createadmin.js"));
app.use("/addmember", require("./router/addmemeber/addmember.js"));
app.use("/projects", require("./router/board/projectBoard.js"));
app.use("/columns", require("./router/column/column.js"));
app.use("/cards", require("./router/card/card.js"));
