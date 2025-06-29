// RecommendedSongs.jsx
import "../css/MyRecommendations.css"; // Assuming you have some styles in MyRecommendations.css

function RecommendedSongs() {
  const recommendedSongs = [
    {
      id: 1,
      title: "Let Go My Hand",
      artist: "J Cole",
      embedUrl: "https://www.youtube.com/embed/HLrFLXf-5dE",
      thumbnail: "https://img.youtube.com/vi/HLrFLXf-5dE/maxresdefault.jpg",
    },
    {
      id: 2,
      title: "This Life",
      artist: "Vampire Weekend",
      embedUrl: "https://www.youtube.com/embed/KIGNNOZ0948",
      thumbnail: "https://img.youtube.com/vi/KIGNNOZ0948/maxresdefault.jpg",
    },
    {
      id: 3,
      title: "Over My Head",
      artist: "The Fray",
      embedUrl: "https://www.youtube.com/embed/9_hHQhBw2wk",
      thumbnail: "https://img.youtube.com/vi/9_hHQhBw2wk/maxresdefault.jpg",
    },
  ];

  return (
    <section className="recommended-section">
      <h2 className="section-title">🎧 Some of my favourites!</h2>
      <div className="songs-grid">
        {recommendedSongs.map((song) => (
          <div key={song.id} className="song-card">
            <iframe
              src={song.embedUrl}
              title={song.title}
              className="song-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="song-info">
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecommendedSongs;
