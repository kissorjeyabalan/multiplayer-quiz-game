const sockets = require('../sockets/active-users');
const Games = require('../db/games');
const express = require('express');
const router = express.Router();

router.get('/games', (req, res) => {
    console.log('get games called');
    if (!req.user) {
        res.status(401).send();
        return;
    }

    res.json({games: Games.getAllAvailableGames()});
});

router.get('/games/:roomId', (req, res) => {
   console.log('get specific room called');
   if (!req.user) {
       res.status(401).send();
       return;
   }

   let game = Games.getGame(req.params.roomId);
   if (game != null) {
       res.json({roomId: game.roomId, game: game});
   } else {
       res.status(404).send();
   }
});

router.post('/games', (req, res) => {
    console.log('post games called');
    if (!req.user) {
        res.status(401).send();
        return;
    }

    if (Games.userIsInGame(req.user.id)) {
        res.status(204).send();
        return;
    }

    let game = Games.createGame(req.user.id);
    game.participants = [...game.participants];
    res.status(201).send({roomId: game.roomId, game: game});

    // TODO: Socket implementation - Notify people in lobby about new room
});

router.post('/games/:roomId', (req, res) => {
   console.log(`Join room with ID ${req.params.roomId}`);
   if (!req.user) {
       res.status(401).send();
       return;
   }

   if (Games.userIsInGame(req.user.id)) {
       res.status(204).send();
       return;
   }

   const game = Games.joinGame(req.user.id, req.params.roomId);
   if (game != null) {
       game.participants = Array.from(game.participants);
       res.status(201).send({roomId: req.params.roomId, game: game});
   } else {
       res.status(400).send();
   }

   // TODO: Socket implementation - Notify people in room about new player
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