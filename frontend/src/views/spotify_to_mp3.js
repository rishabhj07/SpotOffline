import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const ALBUM_DATA_URL = 'http://localhost:8080/fetchAlbumData';
const SELECTED_ALBUM_URL = 'http://localhost:8080/userSelectedAlbum';

const fetchAlbumData = async () => {
  const response = await axios.get(ALBUM_DATA_URL);
  return response.data;
};

const sendSelectedAlbum = async (selected) => {
  const response = await axios.post(SELECTED_ALBUM_URL, selected);
  return response.data.items;
};

const SpotifyConverter = () => {
  const [data, setData] = useState(null);
  const [selectedAlbum, setAlbum] = useState(null);
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAlbumData()
      .then(setData)
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to fetch album data');
      });
  }, []);

  const handleAlbumChange = (e) => {
    const selected = data.find((x) => x.name === e.target.value);
    setAlbum(selected);

    sendSelectedAlbum(selected)
      .then((items) => {
        setItems(items);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to send selected album');
      });
  };

  const handleDownload = (index) => {
    const selectedItem = items[index];
    console.log('Download button clicked for item:', selectedItem);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Link to="/home"><h1 title="Click to return to homepage">SpotOffline</h1></Link>
      {data &&
        <select value={selectedAlbum ? selectedAlbum.name : ""} onChange={handleAlbumChange}>
          <option value="" disabled>Select an album</option>
          {data.map((item, index) => (
            <option key={index} value={item.name}>{item.name}</option>
          ))}
        </select>
      }
      {items &&
        <table>
          <thead>
            <tr>
              <th>Album Art</th>
              <th>Track Info</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td><img src={item.track.album.images[2].url} alt="Album Art" /></td>
                <td>
                  <p>{item.track.name}</p>
                  <p>{item.track.artists.map(artist => artist.name).join(', ')}</p>
                </td>
                <td><button onClick={() => handleDownload(index)}>Download</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default SpotifyConverter;