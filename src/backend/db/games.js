const Quiz = require('../quizes');
const games = [];
const timeState = new Map();

function getAllAvailableGames() {
    return games.filter((game) => {
        return game.started === false;
    });
}

function getGameIndex(roomId) {
    return games.findIndex((game) => {
        return game.roomId === roomId;
    });
}

function userOwnsGame(userId) {
    return games.find(game => game.roomId === userId) != null;
}
function createGame(userId) {
    if (userIsInGame(userId)) return null;
    if (userOwnsGame(userId)) return null;

    let game = {
        started: false,
        finished: false,
        roomId: userId,
        participants: [{
            name: userId,
            score: 0,
            timer: 20,
            finished: false,
            question: 0
        }],
        quiz: null
    };

    games.push(game);

    return game;
}

function userIsInGame(userId) {
    games.forEach(game => {
        game.participants.forEach(player => {
            if (player.name === userId) {
                return true;
            }
        });
    });

    return false;
}

function joinGame(userId, roomId) {
    if (userIsInGame(userId)) return null;

    const index = getGameIndex(roomId);
    if (index === -1) return null;
    if (games[index].started === true) return null;

    games[index].participants.push({
        name: userId,
        score: 0,
        timer: 20,
        finished: false,
        question: 0
    });
    return games[index];

}

function startGame(userId, roomId) {
    if (userId !== roomId) return false;
    const index = getGameIndex(roomId);
    if (games[index].roomId !== userId) return false;
    games[index].quiz = Quiz.getRandomQuiz();
    games[index].started = true;

    games[index].participants.forEach(player => {
        let date = new Date();
        timeState.set(player.name, date);
    });

    return true;
}

function getPlayerInRoom(userId) {
    const gameIndex = getUserGameIndex(userId);
    return games[gameIndex].participants.find((player) => player.name === userId);
}

function submitAnswer(userId, answerIndex) {
    let gameIndex = getUserGameIndex(userId);
    let player = getPlayerInRoom(userId);
    if (player.finished) return player;

    let correctAnswerAtCurrentPlayerIndex = games[gameIndex].quiz.questions[player.question].correctAnswer;

    let currTime = new Date();

    if (correctAnswerAtCurrentPlayerIndex === answerIndex) {
        let prevTime = timeState.get(userId);
        let differenceInSeconds = (currTime - prevTime) / 1000;
        let score = 20;
        score -= differenceInSeconds;
        if (score > 0) {
            player.score += Math.round(score);
        }
    }

    let nextIndex = player.question + 1;
    if ((games[gameIndex].quiz.questions.length > nextIndex)) {
        player.timer = 20;
        player.question = nextIndex;
    } else {
        player.finished = true;
        player.timer = null;
    }

    timeState.set(userId, currTime);
    if (checkGameOver(gameIndex)) {
       games[gameIndex].finished = true;
    }
    return player;
}

function checkGameOver(gameIndex) {
    const finished =
        games[gameIndex].participants.filter(player => player.finished);

    return finished.length === games[gameIndex].participants.length;

}

function getUserGameIndex(userId) {
    return games.findIndex((game) => {
        return game.participants.filter(player => {
            return player.name === userId;
        }).length > 0;
    });
}
function forfeitGame(userId) {
    let gameIndex = getUserGameIndex(userId);

    if (gameIndex !== -1) {
        games[gameIndex].participants =
            games[gameIndex].participants.filter(player => player.name !== userId);
        if (games[gameIndex].participants.length === 0) {
            games.splice(gameIndex, 1);
            return;
        }
    }

    timeState.delete(userId);
}

function getGame(roomId) {
    let gameIndex = getGameIndex(roomId);

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

module.exports = {getPlayerInRoom, submitAnswer, startGame, getRoomUserIsIn, getAllAvailableGames, createGame, userIsInGame, joinGame, forfeitGame, getGame, getGameWithRoomAndUser};