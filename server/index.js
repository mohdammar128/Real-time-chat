const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dbConnection = require("./config/db");

require("dotenv").config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // or your front-end URL
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRouter = require("./router/auth");
const chatRouter = require("./router/chat");
const messageRouter = require("./router/message");
app.use("/api/v1", userRouter);
app.use("/api/v1", chatRouter);
app.use("/api/v1/message", messageRouter);

// Database connection
dbConnection();
// Start the server

io.on("connection", (socket) => {
  // console.log(`A user connected is connected`);
  // // join chat
  socket.on("join-chat", (data) => {
    socket.join(data.roomId);
  });

  socket.on("privateMessage", async (data) => {
    socket.to(data.roomId).emit("recv", data);
  });
  // io.to();
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
