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
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [selectedAlbum, setAlbum] = useState(null);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    console.log("Selected songs: ", selectedSongs);
  }, [selectedSongs]);

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
    setSelectAll(false);
    setSelectedSongs([]);

    sendSelectedAlbum(selected)
      .then((items) => {
        setItems(items);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to send selected album');
      });
  };

  const handleCheckboxChange = (e, songName) => {
    if (e.target.checked) {
      setSelectedSongs(prevSongs => {
        const newSongs = [...prevSongs, songName];
        if (newSongs.length === items.length) {
          setSelectAll(true);
        }
        return newSongs;
      });
    } else {
      setSelectedSongs(prevSongs => {
        const newSongs = prevSongs.filter(song => song !== songName);
        if (newSongs.length < items.length) {
          setSelectAll(false);
        }
        return newSongs;
      });
    }
  };

  const handleSelectAllChange = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedSongs(items.map(item => item.track.name));
    } else {
      setSelectedSongs([]);
    }
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
              <th><input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange} /> Select All</th>
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
                <td>
                  <input
                    type="checkbox"
                    checked={selectedSongs.includes(item.track.name)}
                    onChange={(e) => handleCheckboxChange(e, item.track.name)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default SpotifyConverter;