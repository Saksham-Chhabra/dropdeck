const dotenv = require("dotenv").config();
// server/index.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const youtubeRoutes = require("./routes/youtube");

app.use(cors());
app.use(express.json());

app.use("/api/youtube", youtubeRoutes);
app.use("/api/spotify", youtubeRoutes);

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
  console.log("A user connected");
});

server.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
