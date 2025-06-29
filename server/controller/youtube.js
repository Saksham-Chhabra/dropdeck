const axios = require("axios");
const API_KEY = process.env.YOUTUBE_API_KEY;
console.log("YOUTUBE_API_KEY:", API_KEY); // Debugging line to check if the API key is loaded
const YT_API = "https://www.googleapis.com/youtube/v3/search";
async function search(req, res) {
  const query = req.query.q;
  console.log("Search query:", query); // Debugging line to check the search query
  try {
    const response = await axios.get(YT_API, {
      params: {
        part: "snippet",
        q: query,
        videoEmbeddable: "true", // 👈 important!
        type: "video",
        maxResults: 5,
        key: API_KEY,
      },
    });
    res.json(response.data.items);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch videos");
  }
}

module.exports = {
  search,
};
