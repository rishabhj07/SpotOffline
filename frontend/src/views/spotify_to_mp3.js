import React from "react";
import { Link } from "react-router-dom";

const SpotifyConverter = () => {
  // Fetch API results and populate chart here

  return (
    <div>
      <Link to="/home"><h1 title="Click to return to homepage">SpotOffline</h1></Link>
      <div id="chart">Chart will go here</div>
    </div>
  );
};

export default SpotifyConverter;