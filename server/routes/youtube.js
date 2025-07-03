const router = require("express").Router();
const { search, getRecommendations } = require("../controller/youtube");

const spotifyController = require("../controller/spotify");

// Search tracks
router.get("/search/tracks", async (req, res) => {
  try {
    const { q, limit } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const tracks = await spotifyController.searchTracks(q, limit);
    res.json({ tracks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search artists
router.get("/search/artists", async (req, res) => {
  try {
    const { q, limit } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const artists = await spotifyController.searchArtists(q, limit);
    res.json({ artists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get artist's top tracks
router.get("/artist/:id/top-tracks", async (req, res) => {
  try {
    const { id } = req.params;
    const { country } = req.query;

    const tracks = await spotifyController.getArtistTopTracks(id, country);
    res.json({ tracks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get track details
router.get("/track/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const track = await spotifyController.getTrack(id);
    res.json({ track });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get recommendations
router.get("/recommendations", async (req, res) => {
  try {
    const options = {
      seedTracks: req.query.seed_tracks,
      seedArtists: req.query.seed_artists,
      seedGenres: req.query.seed_genres,
      limit: req.query.limit,
      popularity: req.query.target_popularity,
    };

    const recommendations = await spotifyController.getRecommendations(options);
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getRecommendations", getRecommendations);

router.get("/search", search);

module.exports = router;
