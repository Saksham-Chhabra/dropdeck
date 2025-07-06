const dotenv = require("dotenv").config();
// server/index.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const youtubeRoutes = require("./routes/youtube");
const userRoutes = require("./routes/user");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/dropdeck")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.use("/api/youtube", youtubeRoutes);
app.use("/api/spotify", youtubeRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("🎶 VibeList backend running");
});

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected with id", socket.id);
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", {
      message: data.message,
      id: socket.id,
    });
  });
});

server.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
