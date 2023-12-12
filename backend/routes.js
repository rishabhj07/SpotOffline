const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = 'http://localhost:3000/callback'; // redirect uri

const querystring = require('querystring');
const crypto = require('crypto');

function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex');
}

function fetchAccessToken(code) {

}

router.get(['/', '/index'], (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

router.get('/login', function (req, res) {
    var state = generateRandomString(8);
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
        var authOptions = {
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
            json: true
        };
    }

    axios({
        method: 'post',
        url: authOptions.url,
        headers: authOptions.headers,
        data: querystring.stringify(authOptions.form)
    })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });

    res.redirect('/landingpage');


});

router.get(['/', '/landingpage'], (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

module.exports = router;