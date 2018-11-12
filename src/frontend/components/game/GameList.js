import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const GameList = (props) => {
    const {selectRoom} = props;
    const {games} = props;

    return(
        <ul>
            {games.map(game =>
                <button key={game.roomId} type="button" onClick={() => selectRoom(game.roomId)}><li>Room: {game.roomId}</li></button>
            )}
        </ul>
    );
};

GameList.propTypes = {
    games: PropTypes.array,
    selectRoom: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        games: state.game.games
    };
};

export default connect(mapStateToProps)(GameList);