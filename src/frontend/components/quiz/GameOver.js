import React from 'react';
import PropTypes from 'prop-types';

const GameOver = (props) => {
    const {gameFinished, players} = props;

    return(
        <div>
            {
                !gameFinished ?
                    <div>
                        <h2>You finished!</h2>
                        <h3>Waiting for...</h3>
                        <ul>
                        {getUnfinishedPlayers(players).map((player, index) =>
                            <li key={index}>{player.name} - Currently at question {player.question+1}</li>
                        )}
                        </ul>
                    </div>
                :
                    <div>
                        <h2>Leader Board</h2>
                        <ul>
                            {getSortedPlayers(players).map((player, index) =>
                                <li key={index}>{player.name} - {player.score} points</li>
                            )}
                        </ul>
                    </div>

            }
        </div>
    );
};

function getUnfinishedPlayers(players) {
    return players.filter(player => !player.finished);
}

function getSortedPlayers(players) {
    return players.sort(compareScores);
}

function compareScores(a, b) {
    if (a.score > b.score)
        return 1;
    if (b.score < a.score)
        return -1;
    return 0;
}

GameOver.propTypes = {
    gameFinished: PropTypes.bool,
    players: PropTypes.array
};

export default GameOver;