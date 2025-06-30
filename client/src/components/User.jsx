import "../css/User.css";

export default function User() {
  return (
    <div>
      <div className="account-container">
        <div className="top-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for artists, songs, or playlists..."
            />
            <button className="search-button">Search</button>
          </div>
          <div className="user-image"></div>
        </div>
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
            <div className="playlist">Playlist 1</div>
            <div className="playlist">Playlist 2</div>
            <div className="playlist">Playlist 3</div>
            <div className="playlist">Playlist 4</div>
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
          <button className="play-button">Play</button>
          <button className="pause-button">Pause</button>
          <button className="next-button">Next</button>
          <button className="prev-button">Previous</button>
        </div>
        <div className="now-playing">
          <div className="song-title">Now Playing: Song Title</div>
          <div className="artist-name">Artist Name</div>
        </div>
      </div>
      {/* <div className="bottom-section">
        <div className="footer">
          <p>© 2023 DropDeck. All rights reserved.</p>
          <p>Privacy Policy | Terms of Service</p>
        </div>
      </div> */}
    </div>
  );
}
