import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./views/home";
import Startpage from "./views/startpage";
import SpotifyConverter from "./views/spotify_to_mp3";
import YoutubeConverter from "./views/youtube_to_mp3";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Startpage />} />
        <Route path={"/startpage"} element={<Startpage />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/spotify_to_mp3"} element={<SpotifyConverter />} />
        <Route path={"/youtube_to_mp3"} element={<YoutubeConverter />} />
      </Routes>
    </Router>
  );
}

export default App;