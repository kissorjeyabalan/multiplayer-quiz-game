const sockets = require('../sockets/active-users');
const Games = require('../db/games');
const express = require('express');
const router = express.Router();


router.post('/games', (req, res) => {
    if (!req.user) {
        return res.status(401).send();
    }

    if (Games.userIsInGame(req.user.id)) {
        return res.status(204).send();
    }

    let game = Games.createGame(req.user.id);
    if (game == null) {
        return res.status(401).send();
    }

    game.participants = [...game.participants];
    res.status(201).send({roomId: game.roomId, game: game});
});

router.get('/games', (req, res) => {
    if (!req.user) {
        return res.status(401).send();
    }

    res.json({games: Games.getAllAvailableGames()});
});

router.post('/games/:roomId', (req, res) => {
    if (!req.user) {
        return res.status(401).send();
    }

    if (Games.userIsInGame(req.user.id)) {
        return res.status(400).send();
    }

    const game = Games.joinGame(req.user.id, req.params.roomId);
    if (game != null) {
        game.participants = Array.from(game.participants);
        res.status(201).send({roomId: req.params.roomId, game: game});
    } else {
        res.status(400).send();
    }
});


router.get('/games/:roomId', (req, res) => {
   if (!req.user) {
       return res.status(401).send();
   }

   let game = Games.getGame(req.params.roomId);
   if (game != null) {
       res.json({roomId: game.roomId, game: game});
   } else {
       res.status(404).send();
   }
});

router.get('/user/player', (req, res) => {
    if (!req.user) {
        return res.status(401).send();
    }

    let player = Games.getPlayerInRoom(req.user.id);
    if (player == null) return res.status(404).send();

    res.status(200).send({player: player});
});

router.post('/games/:roomId/start', (req, res) => {
   if (!req.user) {
       return res.status(401).send();
   }

   let started = Games.startGame(req.user.id, req.params.roomId);
   if (!started) return res.status(401).send();

   res.status(200).send();
});

router.post('/user/forfeit', (req, res) => {
   if (!req.user) {
       res.status(401).send();
       return;
   }

   Games.forfeitGame(req.user.id);
   res.status(200).send();
});

module.exports = router;