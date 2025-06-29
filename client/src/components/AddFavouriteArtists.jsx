import { useState } from "react";
import "../css/AddArtists.css";

export default function AddFavouriteArtists() {
  const [artistName, setArtistName] = useState("");
  const [artistsList, setArtistsList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (artistName.trim() && !artistsList.includes(artistName.trim())) {
      setArtistsList([...artistsList, artistName.trim()]);
      setArtistName(""); // Clear form
      console.log("Added artist:", artistName);
    }
  };

  const removeArtist = (artistToRemove) => {
    setArtistsList(artistsList.filter((artist) => artist !== artistToRemove));
    console.log("Removed artist:", artistToRemove);
  };

  return (
    <div className="add-favourite-artists-container">
      <div className="form-wrapper">
        <h1>Manage Your Favourite Artists</h1>
        <p className="subtitle">
          Add and remove artists to customize your music experience
        </p>

        <form onSubmit={handleSubmit} className="artist-form">
          <div className="form-group">
            <label htmlFor="artist-name">Artist Name</label>
            <input
              type="text"
              id="artist-name"
              name="artist-name"
              color="black"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder="Enter artist name..."
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            ✨ Add Artist
          </button>
        </form>

        {/* Artists List */}
        {artistsList.length > 0 && (
          <div className="artists-list">
            <h3>Your Selected Artists ({artistsList.length})</h3>
            <div className="artists-grid">
              {artistsList.map((artist, index) => (
                <div key={index} className="artist-tag">
                  <span className="artist-name">{artist}</span>
                  <button
                    className="remove-btn"
                    onClick={() => removeArtist(artist)}
                    aria-label={`Remove ${artist}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              className="clear-all-btn"
              onClick={() => setArtistsList([])}
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
