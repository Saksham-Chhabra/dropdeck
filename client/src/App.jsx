import { useEffect, useState } from "react";
import "./css/App.css"; // Assuming you have some styles in App.css
import Nav from "./components/Navbar"; // Assuming you have a Nav component
function App() {
  const [message, setMessage] = useState("");

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

  return (
    <div className="App">
      <div className="background"></div>
      <Nav></Nav>
      <div className="content">
        <h1>🎧 Can't get enough of this song?</h1>
        <h2>▶️</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;
