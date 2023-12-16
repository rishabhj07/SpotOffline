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
  const [TrackInfo, setTrackInfo] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    console.log("Selected songs: ", TrackInfo);
  }, [TrackInfo]);

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
    setTrackInfo([]);

    sendSelectedAlbum(selected)
      .then((items) => {
        setItems(items);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to send selected album');
      });
  };

  function getArtistNames(track) {
    return track.artists.map(artist => artist.name).join(', ');
  }

  const handleCheckboxChange = (e, track) => {
    if (e.target.checked) {
      setTrackInfo(prevTrackInfo => {
        const newTrackInfo = [...prevTrackInfo, { name: track.name, artist: getArtistNames(track) }];
        if (newTrackInfo.length === items.length) {
          setSelectAll(true);
        }
        return newTrackInfo;
      });
    } else {
      setTrackInfo(prevTrackInfo => {
        const newTrackInfo = prevTrackInfo.filter(songInfo => songInfo.name !== track.name);
        if (newTrackInfo.length < items.length) {
          setSelectAll(false);
        }
        return newTrackInfo;
      });
    }
  };

  const handleSelectAllChange = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setTrackInfo(items.map(item => {
        return { name: item.track.name, artist: getArtistNames(item.track) };
      }));
    } else {
      setTrackInfo([]);
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
                  <p>{getArtistNames(item.track)}</p>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={TrackInfo.some(song => song.name === item.track.name)}
                    onChange={(e) => handleCheckboxChange(e, item.track)}
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