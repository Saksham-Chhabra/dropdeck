const axios = require("axios");
const User = require("../models/User"); // ✅ Add this import

// API key is loaded
const keys = [
  process.env.YOUTUBE_API_KEY_1,
  process.env.YOUTUBE_API_KEY_2,
  process.env.YOUTUBE_API_KEY_3,
];
let currentIndex = 0;
// Function to get the next API key in a round-robin fashion
function getNextApiKey() {
  const key = keys[currentIndex];
  currentIndex = (currentIndex + 1) % keys.length; // Cycle through the keys
  console.log("Using API Key:", key); // Debugging line to check which key is being used
  return key;
}

const YT_API = "https://www.googleapis.com/youtube/v3/search";
async function search(req, res) {
  const API_KEY = getNextApiKey(); // Get the next API key
  const query = req.query.q;
  console.log("Search query:", query); // Debugging line to check the search query
  try {
    const response = await axios.get(YT_API, {
      params: {
        part: "snippet",
        q: query + "music",
        videoEmbeddable: "true", // 👈 important!
        type: "video",
        maxResults: 5,
        videoCategoryId: 10,
        key: API_KEY,
      },
    });
    res.json(response.data.items);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch videos");
  }
}

async function getRecommendations(req, res) {
  const recentSearches = [];
  const API_KEY = getNextApiKey();
  let recommendations = [];
  try {
    const { userId } = req.params; // Get userId from request parameters
    const user = await User.findById(userId);
    const favouriteArtists = user.favouriteArtists || [];
    for (const artist of favouriteArtists) {
      const response = await axios.get(YT_API, {
        params: {
          part: "snippet",
          q: artist + " music",
          videoEmbeddable: "true",
          type: "video",
          maxResults: 10,
          videoCategoryId: 10,
          key: API_KEY,
        },
      });
      recommendations.push(...response.data.items);
    }
    for (const search of recentSearches) {
      const response = await axios.get(YT_API, {
        params: {
          part: "snippet",
          q: search + " music",
          videoEmbeddable: "true",
          type: "video",
          maxResults: 10,
          videoCategoryId: 10,
          key: API_KEY,
        },
      });
      recommendations.push(...response.data.items);
    }
    res.json(recommendations);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  search,
  getRecommendations,
};
