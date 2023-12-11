const express = require('express');
const router = express.Router();
const path = require('path');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = 'http://localhost:3000/callback'; // redirect uri

const querystring = require('querystring');
const crypto = require('crypto');

function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex');
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
                code: code,
                redirect_uri: 'http://localhost:3000/',
                grant_type: 'authorization_code'
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };
    }

    if (state !== null) {
        // ...
        axios.post(authOptions.url, querystring.stringify(authOptions.form), {
            headers: authOptions.headers
        })
        .then(response => {
            // Handle the response from Spotify
            // The access token will be in response.data.access_token
            console.log(response.data.access_token);
            // Redirect to your landing page
            res.redirect('/landing_page');
        })
        .catch(error => {
            console.error(error);
            res.redirect('/#' +
                querystring.stringify({
                    error: 'invalid_token'
                }));
        });
    }

});

module.exports = router;