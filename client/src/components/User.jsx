import { useEffect, useState } from "react";
import "../css/User.css";

export default function User() {
  const [trackList, setTrackList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [embeddedUrl, setEmbeddedUrl] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [query, setQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(false);

  function fetchVideos(searchTerm) {
    if (!searchTerm.trim() || searchTerm === lastQuery) return;

    fetch(`http://localhost:5000/api/youtube/search?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Search results:", data);
        setTrackList(data || []);
        setShowDropdown(true);
        setLastQuery(searchTerm);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }

  function handleInputChange(e) {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimer) clearTimeout(debounceTimer);
    const newTimer = setTimeout(() => {
      fetchVideos(value);
    }, 600); // 600ms debounce

    setDebounceTimer(newTimer);
  }

  function handleSearchClick() {
    if (debounceTimer) clearTimeout(debounceTimer);
    fetchVideos(query);
  }

  function handleClick(video) {
    setIsPlaying(true);
    setEmbeddedUrl(video.id.videoId);
    setSelectedVideo(video);
    setShowDropdown(false);
  }

  useEffect(() => {
    // Fetch playlists on component mount
    fetch("http://localhost:5000/api/youtube/getRecommendations")
      .then((response) => response.json())
      .then((data) => {
        console.log("Playlists:", data);
        setPlaylists(data || []);
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });
  }, []);

  function cleanArtistName(channelTitle) {
    if (!channelTitle) return "Unknown Artist";

    let cleaned = channelTitle
      .replace(/VEVO$/i, "") // Remove VEVO
      .replace(/Official$/i, "") // Remove Official
      .replace(/Music$/i, "") // Remove Music
      .trim();

    // Add spaces before capital letters (camelCase to spaced)
    cleaned = cleaned.replace(/([a-z])([A-Z])/g, "$1 $2");

    // Handle consecutive capitals (like "USA" -> "U S A", then fix to "USA")
    cleaned = cleaned.replace(/([A-Z])([A-Z][a-z])/g, "$1$2");

    // Clean up multiple spaces
    cleaned = cleaned.replace(/\s+/g, " ").trim();

    return cleaned || "Unknown Artist";
  }

  return (
    <div>
      <div className="account-container">
        <div className="top-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for artists, songs, or playlists..."
              value={query}
              onChange={handleInputChange}
              className="search-input"
            />
            {trackList.length > 0 && showDropdown && (
              <div className="search-dropdown">
                {trackList.map((video) => (
                  <div
                    key={video.etag}
                    className="search-result-item"
                    onClick={() => handleClick(video)}
                  >
                    <div className="video-info">
                      <div className="video-details">
                        <div className="video-image">
                          <img
                            src={video.snippet.thumbnails.default.url}
                            alt=""
                          />
                        </div>
                        <div className="video-name-search">
                          {video.snippet.title}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button className="search-button" onClick={handleSearchClick}>
              Search
            </button>
          </div>
          <div className="user-image"></div>
        </div>

        <div className="middle-section">
          <div className="recommended-artists">
            <div className="recommended-aritsts-list">
              <div className="artist"></div>
              <div className="artist"></div>
              <div className="artist"></div>
              <div className="artist"></div>
            </div>
          </div>
          <div className="playlists-container">
            <div className="playlists">
              <div
                onClick={() => setSelectedPlaylist(true)}
                className="playlist"
              >
                {!selectedPlaylist && (
                  <img
                    className="playlist-display-image"
                    src={playlists[0]?.snippet?.thumbnails?.high?.url}
                    alt=""
                  />
                )}
                {playlists.length > 0 && selectedPlaylist ? (
                  playlists.map((playlist) => (
                    <div
                      onClick={() => handleClick(playlist)}
                      key={playlist.id}
                      className="playlist-item"
                    >
                      <div className="playlist-image">
                        <img
                          src={playlist.snippet.thumbnails.default.url}
                          alt={playlist.snippet.title}
                        />
                      </div>
                      <div className="playlist-title">
                        {playlist.snippet.title}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-playlists"></div>
                )}
              </div>
            </div>
          </div>
          <div className="friends">
            <button className="add-friends">Add Friends</button>
            <div className="friends-list">
              <div className="friend"></div>
              <div className="friend"></div>
              <div className="friend"></div>
              <div className="friend"></div>
            </div>
          </div>
        </div>

        <div className="music-player">
          <div className="player-controls">
            {isPlaying && (
              <iframe
                src={`https://www.youtube.com/embed/${embeddedUrl}?autoplay=1&controls=0`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="YouTube Player"
                width="200px"
                height="100px"
              ></iframe>
            )}
          </div>
          <div className="now-playing">
            <div className="song-title">
              {selectedVideo?.snippet?.title || "No song selected"}
            </div>
            <div className="artist-name">
              {cleanArtistName(selectedVideo?.snippet?.channelTitle)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
