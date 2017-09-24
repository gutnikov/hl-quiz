const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


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
// curl -d '{"name":"Alessandro", "phone":"89263554622"}' -X POST -H "Content-Type: application/json" http://localhost:8080/player
app.post('/player', function(req, res) {
    const {
        name,
        phone
    } = req.body;

    if (!name || !name.trim().length || !phone || !phone.trim().length) {
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
    const user = {
        id: lastPlayerId++,
        name: name,
        phone: phone,
        score: -1
    };
    players.push(user);
    res.status(201).json({
        id: user.id
    });
});

// Update players score
// curl -d '{"id": 0, "score":100}' -X POST -H "Content-Type: application/json" http://localhost:8080/score
app.post('/score', function(req, res) {
    const {
        id,
        score
    } = req.body;
    const player = players.find(p => p.id === id);
    if (!player || isNaN(score) || score < 0) {
        res.sendStatus(400);
        return;
    }
    // Set again?
    if (player.score !== -1) {
        res.sendStatus(409);
        return;
    }
    player.score = score;
    res.sendStatus(200);
});

app.listen(8080, function() {
    console.log('Up and running');
});