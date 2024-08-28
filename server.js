require("dotenv").config();
const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");
const socketAuth = require("./middleware/socketAuth.js");
const getConnection = require("./db.js");
const jwtVerify = require("./middleware/jwtVerfiy.js");

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
const expressServer = app.listen(8000, () => {
  console.log("port is listening on 8000");
});
app.use(express.json({ limit: "3mb" }));
const io = socket(expressServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/health", (req, res) => {
  res.send("Server health is good");
});
app.use("/member", require("./router/login/login.js"));
app.use(jwtVerify);
const namespaces = {};
io.of("/homepage").use(socketAuth);
io.use(socketAuth);

io.of("/homepage", async (homeSocket) => {
  homeSocket.on("userLogin", async () => {
    const userId = homeSocket.user.member_id;
    const connection = await getConnection();
    try {
      await connection.execute(
        "update members set online_status = ? where member_id = ?",
        ["yes", userId]
      );
    } catch (error) {
      console.log(error);
    }

    try {
      const [rows] = await connection.execute(
        "select member_id, member_name, email, online_status from members where online_status = ?",
        ["yes"]
      );

      io.of("/homepage").emit("userUpdate", rows);
    } catch (error) {
      console.log(error);
    } finally {
      connection.end();
    }
  });
  homeSocket.on("disconnect", async () => {
    console.log(homeSocket.user.member_name, "is disconnect");
    const userId = homeSocket.user.member_id;
    const connection = await getConnection();
    try {
      await connection.execute(
        "update members set online_status = ? where member_id = ?",
        ["no", userId]
      );
    } catch (error) {
      console.log(error);
    }

    try {
      const [rows] = await connection.execute(
        "select member_id, member_name, email, online_status from members where online_status = ?",
        ["yes"]
      );

      io.of("/homepage").emit("userUpdate", rows);
    } catch (error) {
      console.log(error);
    } finally {
      connection.end();
    }
  });
});

// io.on("connection", (socket) => {
//   console.log("A user connected");
//   socket.on("join card", (data) => {
//     const { cardId } = data;
//     const { member_name } = socket.user;

//     if (!namespaces[cardId]) {
//       namespaces[cardId] = {
//         ns: io.of(`/card/${cardId}`),
//         connectedUsers: new Set(),
//       };
//       namespaces[cardId].ns.on("connection", (nsSocket) => {
//         if (namespaces[cardId].connectedUsers.has(member_name)) {
//           nsSocket.disconnect(true);
//           console.log(`${member_name} is already connected to /card/${cardId}`);
//           return;
//         }

//         console.log(`${member_name} connected to /card/${cardId}`);
//         namespaces[cardId].connectedUsers.add(member_name);
//         nsSocket.join(cardId);
//         nsSocket.to(cardId).emit("user joined", { userName: member_name });

//         nsSocket.on("chat message", (msg) => {
//           console.log(msg);
//           namespaces[cardId].ns.to(cardId).emit("chat message", {
//             message: msg,
//             userName: member_name,
//             date: Date.now(),
//           });
//         });
//         nsSocket.on("leave card", (data) => {
//           const { cardId } = data;
//           console.log(`${member_name} is leaving /card/${cardId}`);
//           nsSocket.to(cardId).emit("user left", { userName: member_name });
//         });

//         nsSocket.on("disconnect", () => {
//           nsSocket.to(cardId).emit("user left", { userName: member_name });
//           console.log(`${member_name} disconnected from /card/${cardId}`);
//         });
//       });
//     }
//     socket.emit("connect to namespace", `http://localhost:8000/card/${cardId}`);
//   });
// });

// app.get("/jwt", (req, res) => {
//   res.json({ message: "success" });
// });

app.use("/createadmin", require("./router/createAdmin/createadmin.js"));
app.use("/addmember", require("./router/addmemeber/addmember.js"));
app.use("/fetch-online", require("./router/onlineuser/online.js"));
app.use("/projects", require("./router/board/projectBoard.js"));
app.use("/columns", require("./router/column/column.js"));
app.use("/cards", require("./router/card/card.js"));
app.use("/assign", require("./router/assignee/assignee.js"));
app.use("/cal", require("./router/meetings/meetings.js"));
app.use("/sub-tasks", require("./router/card/subtask.js"));
app.use("/my", require("./router/userprofile/userProfile.js"));
app.use("/avatar", require("./router/avatar/avatar.js"));
app.use("/analytics", require("./router/analytic/analytic.js"));
