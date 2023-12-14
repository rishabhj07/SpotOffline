const express = require('express');
const router = express.Router();
const axios = require('axios');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = 'http://localhost:8080/callback'; // redirect uri

const querystring = require('querystring');
const crypto = require('crypto');

function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex');
}

let authOptions = {};
let accessToken = '';

router.get('/login', function (req, res) {
    var state = generateRandomString(8);
    const scopes = [
        'playlist-read-private',
    ];

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scopes,
            redirect_uri: redirect_uri,
            state: state
        }));
});

router.get('/callback', function (req, res) {
    var code = req.query.code || null;
    var state = req.query.state || null;
    if (state === null) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirect_uri,
                client_id: client_id,
                client_secret: client_secret
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
        };
    }

    axios({
        method: 'post',
        url: authOptions.url,
        headers: authOptions.headers,
        data: querystring.stringify(authOptions.form)
    })
        .then(response => {
            accessToken = response.data.access_token; // Assign value to accessToken
        });

    res.redirect('http://localhost:3000/home');
});

router.get('/fetchAlbumData', function (req, res) {
    axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me/playlists?limit=50&offset=0',
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    })
        .then(response => {
            res.json(response.data.items);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

router.post('/userSelectedAlbum', function (req, res) {
    const selectedAlbum = req.body;

    axios({
        method: 'get',
        url: selectedAlbum.tracks.href,
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    })
    .then(response => {
        res.json(response.data);
        console.log(response.data.items);
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    });
});


router.get('/youtube_to_mp3', function (req, res) {
    res.redirect('http://localhost:3000/youtube_to_mp3');
});

module.exports = router;