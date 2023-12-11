require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const http = require('http')

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri

const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
];

const app = express();

const PORT = process.env.PORT || 3000
const ROOT_DIR_JS = 'client/src/js'; //root directory for javascript files

// Middleware
app.use(morgan('dev'));

//Convert any JSON stringified strings in a POST request to JSON.
app.use(express.json())

app.use(express.static('client/public'))

// Routes
app.get(['/', '/index'], (req, res) => {
    res.sendFile(__dirname + '/client/public/index.html')
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

