import { useState } from "react";
import "../css/AddArtist.css"; // Assuming you have some styles in AddArtist.css

function AddArtist() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchArtist = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const res = await fetch(
      `http://localhost:5000/api/youtube/search?q=${query}`
    );
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="artist-search">
      <form onSubmit={searchArtist}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your favorite artists..."
        />
        <button type="submit">Search</button>
      </form>

      <div className="videos">
        {results.map((video) => (
          <iframe
            key={video.id.videoId}
            width="300"
            height="200"
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            title={video.snippet.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        ))}
      </div>
    </div>
  );
}

export default AddArtist;
