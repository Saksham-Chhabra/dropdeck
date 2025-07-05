const User = require("../models/User");

async function handleUserSignUp(req, res) {
  try {
    const { username, password, email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    // Create new user
    const user = await User.create({
      username,
      password,
      email,
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function addFavoriteArtist(req, res) {
  const { userId } = req.params;
  console.log("Adding favourite artist for user:", userId);
  const { artistName } = req.body;
  console.log("Artist name to add:", artistName);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.favouriteArtists.push(artistName);
    await user.save();

    res.status(200).json({ message: "Artist added to favourites", user });
  } catch (error) {
    console.error("Error adding favourite artist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function addFavoriteArtists(req, res) {
  const { userId } = req.params;
  const { artists } = req.body;
  console.log("Adding favourite artists for user:", userId);
  console.log("Artists to add:", artists);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add each artist to the user's favourite artists
    artists.forEach((artist) => {
      if (!user.favouriteArtists.includes(artist.name)) {
        user.favouriteArtists.push(artist.name);
      }
      console.log("Adding artist:", artist.name);
    });
    console.log("Updated favourite artists:", user.favouriteArtists);
    await user.save();
    // Save the updated user
  } catch (error) {
    console.error("Error adding favourite artists:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getFavoriteArtists(req, res) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ favouriteArtists: user.favouriteArtists });
  } catch (error) {
    console.error("Error fetching favourite artists:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  handleUserSignUp,
  addFavoriteArtist,
  getFavoriteArtists,
  addFavoriteArtists,
};
