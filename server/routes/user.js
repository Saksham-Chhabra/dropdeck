const express = require("express");
const {
  handleUserSignUp,
  addFavoriteArtist,
  getFavoriteArtists,
  addFavoriteArtists,
} = require("../controller/user");
const router = express.Router();

router.post("/signup", handleUserSignUp);
router.post("/:userId/artists", addFavoriteArtists);
router.get("/:userId/artists", getFavoriteArtists);

module.exports = router;
