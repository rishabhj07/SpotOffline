import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

const SpotifyConverter = () => {
  const [data, setData] = useState(null); // Used to store the fetched data
  const [selectedAlbum, setAlbum] = useState(null); // Used to store the fetched data

  useEffect(() => {
    fetch('http://localhost:8080/spotify_to_mp3')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data); 
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <Link to="/home"><h1 title="Click to return to homepage">SpotOffline</h1></Link>
      <div id="chart">Chart will go here</div>
      {data && 
        <select
          onChange={(e) =>{
            const c = data.find((x) => x.name === e.target.value);
            setAlbum(c);
          }}>
          {data.map((item, index) => (
            <option key={index} value={item.name}>{item.name}</option>
          ))}
        </select>
      }
      {selectedAlbum && <div>Selected Album: {selectedAlbum.name}</div>}
    </div>
  );
};

export default SpotifyConverter;

