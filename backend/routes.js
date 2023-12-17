const express = require('express');
const router = express.Router();
const axios = require('axios');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

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

router.post('/downloadTracks', async (req, res) => {
    const trackInfo = req.body;
    // Create a new directory for the downloaded files if it doesn't already exist
    const downloadsDir = path.join(__dirname, 'downloads');
    if (!fs.existsSync(downloadsDir)) {
        fs.mkdirSync(downloadsDir);
    }

    if (trackInfo.length > 1) {
        const archive = archiver('zip');
        const output = fs.createWriteStream(path.join(downloadsDir, 'downloaded_songs.zip'));

        output.on('close', function () {
            res.setHeader('Content-Type', 'application/zip');
            res.setHeader('Content-Disposition', 'attachment; filename=tracks.zip');
            res.download(path.join(downloadsDir, 'downloaded_songs.zip'));
        });

        archive.pipe(output);

        const downloadPromises = trackInfo.map(async (track) => {
            try {
                const query = `${track.name} ${track.artist}`;
                const results = await ytsr(query, { limit: 1 });
                if (results && results.items && results.items.length > 0) {
                    const url = results.items[0].url;
                    const stream = ytdl(url, { filter: 'audioonly' });
                    stream.on('error', error => {
                        console.error(`An error occurred when downloading the video at url: ${url}`, error);
                    });
                    archive.append(stream, { name: `${track.name}.mp3` });
                } else {
                    console.error(`No results found for the song: ${track.name}`);
                }
            } catch (error) {
                console.error(`An error occurred when downloading the song: ${track.name}`, error);
            }
        });

        Promise.all(downloadPromises).then(() => {
            archive.finalize();
        });
    } else if (trackInfo.length === 1) {
        try {
            const track = trackInfo[0];
            const query = `${track.name} ${track.artist}`;
            const results = await ytsr(query, { limit: 1 });
            const url = results.items[0].url;
            const stream = ytdl(url, { filter: 'audioonly' });
            const output = fs.createWriteStream(path.join(downloadsDir, `${track.name}.mp3`));

            stream.pipe(output);

            output.on('finish', function () {
                res.setHeader('Content-Type', 'audio/mpeg');
                res.setHeader('Content-Disposition', `attachment; filename=${track.name}.mp3`);
                res.download(path.join(downloadsDir, `${track.name}.mp3`));
            });
        } catch (error) {
            console.error(`An error occurred when downloading the song: ${track.name}`, error);
        }
    } else {
        res.status(400).json({ error: 'No tracks provided' });
    }
});

router.get('/youtube_to_mp3', function (req, res) {
    res.redirect('http://localhost:3000/youtube_to_mp3');
});

module.exports = router;