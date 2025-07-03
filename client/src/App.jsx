import { useEffect, useState } from "react";
import "./css/App.css"; // Assuming you have some styles in App.css
import Nav from "./components/Navbar"; // Assuming you have a Nav component
import RecommendedSongs from "./components/recommendedSongs"; // Assuming you have an AddArtist component
import Login from "./components/login";
import { Navigate, useNavigate } from "react-router-dom";
import Chat from "./components/Chat";

let signedIn = true;

function App() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        setMessage(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setMessage("Failed to fetch message from server");
      });
  }, []);

  const handleJoinClick = () => {
    signedIn = true;
    navigate("/add-artist", { replace: true }); // Fixed navigation
  };

  return (
    <div className="App">
      <Nav></Nav>
      <Chat />
      <div className="background"></div>
      <button onClick={handleJoinClick} className="join">
        Join the Community!
      </button>
      {/* <div className="content">
        <h1>My Personal Recommendations!</h1>
        <RecommendedSongs />
        <p>{message}</p>
      </div> */}
    </div>
  );
}

export default App;
