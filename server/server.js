const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


let lastPlayerId = 0;

const players = [];
const phonesMap = {};

// Actual players list
// curl http://localhost:8080/players
app.get('/players', function(req, res) {
    res.json({
        players: players
    });
});

// Register new player
// curl -d '{"userName":"Alessandro", "phone":"89263554622"}' -X POST -H "Content-Type: application/json" http://localhost:8080/player
app.post('/player', function(req, res) {
    const {
        userName,
        phone
    } = req.body;

    if (!userName || !userName.trim().length ||
        !phone || !phone.trim().length) {
        res.sendStatus(400);
        return;
    }

    // Take last digits to not to check +7 or 8 at the beginning
    const phoneTail = phone.trim().slice(-5);

    // Check if phone already registered?
    if (phonesMap[phoneTail]) {
        res.sendStatus(409); // Conflict
        return;
    } else {
        phonesMap[phoneTail] = true;
    }

    // Register user
    players.push({
        userId: lastPlayerId++,
        userName: userName,
        phone: phone,
        score: -1
    });
    res.sendStatus(201); // Created
});

// Update players score
// curl -d '{"userId": 0, "score":100}' -X POST -H "Content-Type: application/json" http://localhost:8080/score
app.post('/score', function(req, res) {
    const {
        userId,
        score
    } = req.body;
    const player = players.find(p => p.userId === userId);
    if (!player || isNaN(score) || score < 0) {
        res.sendStatus(400);
        return;
    }
    // Set again?
    if (player.score === -1) {
        res.sendStatus(409);
        return;
    }
    player.score = score;
    res.sendStatus(200);
});

app.listen(8080, function() {
    console.log('Up and running');
});