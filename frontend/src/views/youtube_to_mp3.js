import React, { useState } from "react";
import { Link } from "react-router-dom";

const YoutubeConverter = () => {
  const [link, setLink] = useState("");

  const handleInputChange = (event) => {
    setLink(event.target.value);
  };

  const handleSearchClick = () => {
    // Handle search click
  };

  return (
    <div>
      <Link to="/home"><h1 title="Click to return to homepage">Spotoffline</h1></Link>
      <input type="text" value={link} onChange={handleInputChange} placeholder="Enter YouTube link" />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default YoutubeConverter;