import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const SpotifyConverter = () => {
  const [data, setData] = useState(null); // Used to store the fetched data
  const [selectedAlbum, setAlbum] = useState(null); // Used to store the fetched data

  useEffect(() => {
    axios.get('http://localhost:8080/fetchAlbumData')
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleAlbumChange = (e) => {
    const selected = data.find((x) => x.name === e.target.value);
    setAlbum(selected);
  
    // Send the selected album back to the server
    axios.post('http://localhost:8080/userSelectedAlbum', selected)
      .then(response => {
        console.log('Response from server:');
        console.log(response.data.items);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <Link to="/home"><h1 title="Click to return to homepage">SpotOffline</h1></Link>
      {data &&
        <select onChange={handleAlbumChange}>
          <option value="">Select an album</option>
          {data.map((item, index) => (
            <option key={index} value={item.name}>{item.name}</option>
          ))}
        </select>
      }
      {selectedAlbum && <div>Selected Album: {selectedAlbum.tracks.href}</div>}
    </div>
  );
};

export default SpotifyConverter;

