const socket = require('socket.io');
const Tokens = require('./tokens');
const ActiveUsers = require('./active-users');
const Games = require('../db/games');

let io;

const start = (server) => {
    io = socket(server);

    io.on('connection', (socket) => {
        console.info(`Created socket with ID ${socket.id}`);

        /*
        WebSocket login taken from https://github.com/arcuri82/pg6300/blob/master/les11/connect4-v2/src/server/ws/ws_handler.js
         */
        socket.on('login', (data) => {
           if (data == null) {
               socket.emit('error', {error: 'No payload received!'});
               return;
           }
           const token = data.wstoken;
           if (token == null) {
               socket.emit('error', {error: 'Missing token!'});
               return;
           }

           const userId = Tokens.consumeToken(token);
           if (userId == null) {
               socket.emit('error', {error: 'Invalid token.'});
               return;
           }

           ActiveUsers.registerSocket(socket, userId);
           console.info(`User ${userId} is now authenticated with WebSocket`);
        });

        socket.on('disconnect', () => {
            const userId = ActiveUsers.getUser(socket.id);
            ActiveUsers.removeSocket(socket.id);
            let roomId = Games.getRoomUserIsIn(userId);
            console.info(`User ${userId} has disconnected - forfeiting all games. Room  ID is ${roomId}`);
            Games.forfeitGame(userId);
            if (roomId != null) {
                socket.to(roomId).emit('room', {type: 'REFRESH_ROOM'});
                socket.to(roomId).emit('game', {type: 'REFRESH_ROOM'});
                socket.broadcast.emit('room', {type: 'REFRESH_LOBBY'});
            }
        });

        socket.on('room-created', (data) => {
            const userId = ActiveUsers.getUser(socket.id);
            if (Games.getRoomUserIsIn(userId) === data.roomId) {
                socket.join(data.roomId);
                socket.broadcast.emit('room', {type: 'REFRESH_LOBBY'});
                socket.emit('room', {type: 'REFRESH_PLAYER'});

                const game = Games.getGame(data.roomId);
                socket.emit('game', {type: 'REFRESH_PLAYER', data: {roomId: game.roomId, game: game}});
            }
        });

        socket.on('join-room', (data) => {
            const userId = ActiveUsers.getUser(socket.id);
            if (Games.getRoomUserIsIn(userId) === data.roomId) {
                socket.join(data.roomId);
                socket.to(data.roomId).emit('room', {type: 'REFRESH_ROOM'});
                socket.emit('room', {type: 'REFRESH_PLAYER'});

                const game = Games.getGame(data.roomId);
                socket.emit('game', {type: 'REFRESH_PLAYER', data: {roomId: game.roomId, game: game}});
            }
        });

        socket.on('game', (data) => {
            if (data.type === 'REFRESH_ROOM') {
                io.in(data.roomId).emit('room', {type: 'REFRESH_ROOM'});
            }

            if (data.type === 'SUBMIT_ANSWER') {
                const userId = ActiveUsers.getUser(socket.id);
                const roomId = Games.getRoomUserIsIn(userId);

                const game = Games.getGame(roomId);
                const answer = data.answer;
                let updated = Games.submitAnswer(userId, answer);

                socket.emit('game', {type: 'REFRESH_PLAYER', player: updated});
                socket.to(roomId).emit('game', {type: 'REFRESH_ROOM', data: {roomId: game.roomId, game: game}});
            }
        });
    });
};
module.exports = {start};