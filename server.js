const express = require("express");
const user_auth = require("./middleware/user_auth.js");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

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

io.on("connection", (socket) => {
  socket.emit("nslist", { data: "hey its works" });
  socket.on("message", (msg) => {
    console.log(msg);
  });
});

app.use(express.json());
app.use("/admin", require("./router/login/login.js"));
app.use("/member", require("./router/login/memberLogin.js"));
// app.use(user_auth);
app.use("/createadmin", require("./router/createAdmin/createadmin.js"));
app.use("/addmember", require("./router/addmemeber/addmember.js"));
app.use("/board/public", require("./router/board/publicBoard.js"));
app.use("/board/private", require("./router/board/privateBoard.js"));
app.use("/list/column", require("./router/list_Column/list_Column.js"));
app.use("/card", require("./router/card/card.js"));
app.use("/comments", require("./router/comment/comment.js"));
