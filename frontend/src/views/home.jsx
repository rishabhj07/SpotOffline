import React from "react";
import { Link } from "react-router-dom";

const spotifyConverterClick = () => {
    window.location.href = 'http://localhost:3000/spotify_to_mp3';
};

const youtubeConverterClick = () => {
    window.location.href = 'http://localhost:3000/youtube_to_mp3';
};

const Home = () => {
    return (
        <div>
            <Link to="/home"><h1 title="Click to return to homepage">SpotOffline</h1></Link>
            <button onClick={spotifyConverterClick}>Spotify to mp3</button>
            <button onClick={youtubeConverterClick}>Youtube to mp3</button>
        </div>
    );
};

export default Home;