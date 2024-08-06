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

const namespaces = {}; // To store namespaces and their users

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join card", (data) => {
    const { cardId, userName } = data;

    // Create namespace if it doesn't exist
    if (!namespaces[cardId]) {
      namespaces[cardId] = io.of(`/card/${cardId}`);
      namespaces[cardId].on("connection", (nsSocket) => {
        console.log(`${userName} connected to /card/${cardId}`);

        // Join the user to a room within the namespace
        nsSocket.join(cardId);
        nsSocket.to(cardId).emit("user joined", { userName: userName });

        // Handle chat messages
        nsSocket.on("chat message", (msg) => {
          namespaces[cardId].to(cardId).emit("chat message", {
            message: msg,
            userName: userName,
          });
        });

        // Handle user disconnection
        nsSocket.on("disconnect", () => {
          nsSocket.to(cardId).emit("user left", { userName: userName });
          console.log(`${userName} disconnected from /card/${cardId}`);
        });
      });
    }

    // Connect the user to the namespace
    socket.emit("connect to namespace", `/card/${cardId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(express.json());
app.use("/admin", require("./router/login/login.js"));
app.use("/member", require("./router/login/memberLogin.js"));
// app.use(user_auth);
app.use("/createadmin", require("./router/createAdmin/createadmin.js"));
app.use("/addmember", require("./router/addmemeber/addmember.js"));
app.use("/projects", require("./router/board/projectBoard.js"));
app.use("/columns", require("./router/column/column.js"));
app.use("/cards", require("./router/card/card.js"));
