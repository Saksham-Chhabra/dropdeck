import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import AddFavouriteArtists from "./components/AddFavouriteArtists.jsx";
import User from "./components/User.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<User />} />
        <Route path="/add-artist" element={<AddFavouriteArtists />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
