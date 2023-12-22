import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Startpage from "./views/startpage";
import SpotifyConverter from "./views/spotify_to_mp3";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Startpage />} />
        <Route path={"/startpage"} element={<Startpage />} />
        <Route path={"/spotify_to_mp3"} element={<SpotifyConverter />} />
      </Routes>
    </Router>
  );
}

export default App;