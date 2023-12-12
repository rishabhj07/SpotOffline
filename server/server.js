require('dotenv').config()

const express = require('express');
const routes = require('./routes');
const path = require('path');
const morgan = require('morgan');
const http = require('http')

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
const ROOT_DIR_VIEWS = '../client'; 

// Middleware
app.use(morgan('dev'));

// Provide static server
app.use(express.static(path.join(__dirname, ROOT_DIR_VIEWS))); 

// Use the routes with your app
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});