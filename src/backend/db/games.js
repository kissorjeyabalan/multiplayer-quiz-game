const Quiz = require('../quizes');
const games = [];



function getAllAvailableGames() {
    return games.filter((game) => {
        return game.started === false;
    });
}

function createGame(userId) {
    if (userIsInGame(userId)) return false;

    let game = {
        started: false,
        roomId: userId,
        participants: [{
            name: userId,
            score: 0,
            finished: false
        }],
        quiz: null
    };

    games.push(game);

    return game;
}

function userIsInGame(userId) {
    return games.filter((game) => {
        return game.participants.filter(player => {
            return player.name === userId;
        });
    }) > 0;
}

function joinGame(userId, roomId) {
    console.log("received", userId, roomId);
    if (userIsInGame(userId)) return null;

    const index = games.findIndex((game) => {
        return game.roomId === roomId && game.started === false;
    });

    console.log("index is", index);

    if (index !== -1) {
        console.log("got in index");
        games[index].participants.push({
            name: userId,
            score: 0,
            finished: false
        });
        return games[index];
    }
    return null;
}


function forfeitGame(userId) {
    console.log("forfeit for ", userId);
    let gameIndex = games.findIndex((game) => {
        console.log("checking in room", game);
        return game.participants.filter(player => {
            console.log("checking one against other", player.name, userId);
            return player.name === userId;
        }).length > 0;
    });

    console.log("gameIndex", gameIndex);

    if (gameIndex !== -1) {
        games[gameIndex].participants =
            games[gameIndex].participants.filter(player => player.name !== userId);
        if (games[gameIndex].participants.length === 0) {
            games.splice(gameIndex, 1);
            return;
        }
        if (games[gameIndex].roomId === userId) {
            let random = games[gameIndex].participants[
                Math.floor(Math.random() * games[gameIndex].participants.length)
                ];
            games[gameIndex].roomId = random.name;
        }
    }
}

function getGame(roomId) {
    let gameIndex = games.findIndex((game) => {
        return game.roomId === roomId;
    });
    if (gameIndex !== -1) {
        return games[gameIndex];
    }

    return null;

}

function getGameWithRoomAndUser(roomId, userId) {
    let game = getGame(roomId);
    if (game != null) {
        let userIsInGame = game.participants.filter(player =>  player.name === userId) > 0;
        if (userIsInGame) {
            return game;
        }
    } else {
        return null;
    }
}

function getRoomUserIsIn(userId) {
    let name = null;
    games.map((game) => {
        game.participants.map(player => {
            if (player.name === userId) {
                name = game.roomId;
            }
        });
    });

    return name;
}

module.exports = {getRoomUserIsIn, getAllAvailableGames, createGame, userIsInGame, joinGame, forfeitGame, getGame, getGameWithRoomAndUser};