import { useState } from "react";
import "../css/AddArtists.css";
import RecommendedSongs from "./recommendedSongs";

export default function AddFavouriteArtists() {
  const [artistName, setArtistName] = useState("");
  const [artistsList, setArtistsList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setArtistName(value);
    if (value.trim() === "") {
      setSearchResults([]);
      setShowDropdown(false);
    } else {
      setIsSearching(true);
      fetch(`http://localhost:5000/api/spotify/search/artists?q=${value}`)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.artists || []); // Ensure data is in the expected format
          console.log(data.artists); // Debugging line to check fetched data
          setShowDropdown(true);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        })
        .finally(() => {
          setIsSearching(false);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = artistName.trim();
    if (trimmedName === "") {
      return; // Prevent adding empty artists
    }
    const existingArtist = artistsList.find(
      (artist) => artist.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (existingArtist) {
      console.warn("Artist already exists in the list:", existingArtist);
      return; // Prevent adding duplicate artists
    }
    const newArtist = {
      id: Date.now(), // Using timestamp as a unique ID
      name: trimmedName,
      image: null, // Placeholder for image, can be updated later
      genres: [], // Placeholder for genres, can be updated later
      popularity: 0, // Placeholder for popularity, can be updated later
      isManual: true, // Flag to indicate manual addition
    };
    setArtistsList([...artistsList, newArtist]);
    setArtistName(""); // Clear input field after adding
    setSearchResults([]); // Clear search results after adding
    setShowDropdown(false); // Hide dropdown after adding
    console.log("Added artist:", newArtist); // Debugging line to check added artist
  };
  const addArtistFromSearch = (artist) => {
    const existingArtist = artistsList.find(
      (a) =>
        a.id === artist.id || a.name.toLowerCase() === artist.name.toLowerCase()
    );
    if (existingArtist) {
      console.warn("Artist already exists in the list:", existingArtist);
      return; // Prevent adding duplicate artists
    }
    const newArtist = {
      id: artist.id,
      name: artist.name,
      image: artist.image || null, // Use provided image or null
      genres: artist.genres || [], // Use provided genres or empty array
      popularity: artist.popularity || 0, // Use provided popularity or 0
      isManual: false, // Flag to indicate artist was added from search
    };
    setArtistsList([...artistsList, newArtist]);
    setArtistName(""); // Clear input field after adding
    setSearchResults([]); // Clear search results after adding
    setShowDropdown(false); // Hide dropdown after adding
    console.log("Added artist from search:", newArtist); // Debugging line to check added artist
  };

  const removeArtist = (artistToRemove) => {
    setArtistsList(
      artistsList.filter((artist) => artist.id !== artistToRemove.id)
    );
    console.log("Removed artist:", artistToRemove);
  };
  // Add this right before your return statement
  console.log("Render Debug:", {
    showDropdown,
    searchResultsLength: searchResults.length,
    isSearching,
    artistName,
  });

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
            <div className="search-container">
              <input
                type="text"
                id="artist-name"
                name="artist-name"
                value={artistName}
                onChange={handleInputChange}
                placeholder="Search for artists..."
                required
                autoComplete="off"
              />

              {/* Loading indicator */}
              {/* {isSearching && (
                <div className="search-loading">Searching...</div>
              )} */}

              {/* Search results dropdown */}
              {showDropdown && searchResults.length > 0 && (
                <div className="search-dropdown">
                  {searchResults.map((artist) => (
                    <div
                      key={artist.id}
                      className="search-result-item"
                      onClick={() => addArtistFromSearch(artist)}
                    >
                      <div className="artist-info">
                        <div className="artist-details">
                          <div className="artist-image">
                            <img src={artist.image} alt="" />
                          </div>
                          <div className="artist-name-search">
                            {artist.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="submit-btn">
            ✨ Add Artist
          </button>
        </form>

        {/* Artists List - Always visible */}
        <div className="artists-list">
          <div className="artists-grid">
            {artistsList.map((artist) => (
              <div key={artist.id} className="artist-tag">
                <div className="artist-cancel">
                  {artist.image && !artist.isManual && (
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="artist-image"
                    />
                  )}
                  <button
                    className="remove-btn"
                    onClick={() => removeArtist(artist)}
                    aria-label={`Remove ${artist.name}`}
                  >
                    ✕
                  </button>
                </div>
                <div className="artist-tag-info">
                  <span className="artist-name">{artist.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <RecommendedSongs />
      </div>
    </div>
  );
}
