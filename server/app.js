const dotenv = require("dotenv").config();
// server/index.js
const express = require("express");
const cors = require("cors");
const app = express();
const youtubeRoutes = require("./routes/youtube");

console.log("load api key", process.env.YOUTUBE_API_KEY);

app.use(cors());
app.use(express.json());

app.use("/api/youtube", youtubeRoutes);
app.use("/api/spotify", youtubeRoutes);

app.get("/", (req, res) => {
  res.send("🎶 VibeList backend running");
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
