import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Home from "./components/Home.jsx";
import AddFavouriteArtists from "./components/AddFavouriteArtists.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-artist" element={<AddFavouriteArtists />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
