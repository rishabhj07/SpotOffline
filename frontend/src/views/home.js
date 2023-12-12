import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const spotifyConverterClick = () => {
        window.location.href = 'http://localhost:8080/spotify_to_mp3';
    };

    const youtubeConverterClick = () => {
        window.location.href = 'http://localhost:8080/spotify_to_mp3';
    };

    return (
        <div>
            <Link to="/home"><h1 title="Click to return to homepage">SpotOffline</h1></Link>
            <button onClick={spotifyConverterClick}>Spotify to mp3</button>
            <button onClick={youtubeConverterClick}>Youtube to mp3</button>
        </div>
    );
};

export default Home;