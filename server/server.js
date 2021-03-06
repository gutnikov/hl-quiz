const express = require('express');
const bodyParser = require('body-parser');
const uniqid = require('uniqid');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

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

db.defaults({ players: [] }).write();

// Actual players list
// curl http://localhost:8080/players
app.get('/players', function(req, res) {

    const players = db.get('players').value();

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

    let player = db.get('players').find({ 'phoneTail': phoneTail }).value();

    // Check if phone already registered?
    if (player) {
        res.sendStatus(409); // Conflict
        return;
    }

    // Register user
    const user = {
        id: uniqid(),
        name: name,
        phone: phone,
        phoneTail: phoneTail,
        score: -1,
        rating: 0
    };

    db.get('players')
        .push(user)
        .write();

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

    let player = db.get('players').find({ 'id': id }).value();

    if (!player || isNaN(score) || score < 0) {
        res.sendStatus(400);
        return;
    }

    // Set again?
    if (player.score !== -1) {
        res.sendStatus(409);
        return;
    }

    db.get('players').find({ 'id': id })
        .assign({ score: Number(score)})
        .write();

    // Reorder rating
    const players = updateRatings();

    player = players.find(item => {
        return item.id === id
    });

    res.status(200).json({
        rating: player.rating
    });
});

function updateRatings() {
    const players = db.get('players').value();

    // Order players
    players.sort(function(a, b) {
        if (a.score === b.score) {
            return 0;
        } else {
            return a.score < b.score ? 1 : -1;
        }
    });

    // Set ratings
    players.forEach((player, key) => {
        player.rating = key + 1;
    });

    db.set('players', players).write();

    return players;
}

/**
 * Update users positions
 *
 * curl http://localhost:8080/update-positions
 */
app.get('/update-positions', function(req, res) {
    const players = updateRatings();

    res.json({
        players: players
    });
});

/**
 * Get player data
 *
 * curl -d '{"p1": "", "p2":""}' -X GET -H "Content-Type: application/json" http://localhost:8080/players
 */
app.get('/players-info', function(req, res) {

    const p1 = db.get('players').find({ 'id': req.query.p1Id }).value();
    const p2 = db.get('players').find({ 'id': req.query.p2Id }).value();

    if (!p1 || !p2) {
        res.sendStatus(404); // Not found
        return;
    }

    res.json({
        player1: p1,
        player2: p2
    });
});

app.listen(8080, function() {
    console.log('Up and running');
});