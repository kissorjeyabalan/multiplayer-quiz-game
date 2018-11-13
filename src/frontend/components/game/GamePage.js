import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {REQUIRES_AUTHENTICATION} from "../../actions/action-types";
import GameList from './GameList';
import QuizPage from '../quiz/QuizPage';
import {createRoom, getSelfPlayer, getRooms, joinRoom, forfeitGame, refreshRoom, startGame} from '../../actions/game-actions';
import io from 'socket.io-client';
import axios from 'axios';

class GamePage extends React.Component {
    constructor(props) {
        super(props);

        this.joinRoom = this.joinRoom.bind(this);
        this.startGame = this.startGame.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.doLoginWebSocket = this.doLoginWebSocket.bind(this);
    }


    componentDidMount() {
        if (!this.props.authenticated) {
            this.props.requireAuth();
            return;
        }

        this.props.getRooms();

        this.socket = io(window.location.origin);
        this.doLoginWebSocket();

        this.socket.on('room', (data) => {
            console.log('received on room', data);
           if (data.type === 'REFRESH_LOBBY') {
               this.props.getRooms();
           }
           if (data.type === 'REFRESH_ROOM') {
               this.props.refreshRoom(this.props.roomId);
           }
           if (data.type === 'REFRESH_PLAYER') {
               this.props.refreshPlayer();
           }
        });
    }

    componentWillUnmount() {
        this.props.forfeitGame();
        if (this.socket != null) {
            this.socket.disconnect();
        }
    }

    doLoginWebSocket() {
        // Taken from pg6300 repo
        const url = '/api/auth/wstoken';
        axios.post(url).then(res => {
            this.socket.emit('login', res.data);
        }).catch(err => {
           if (err.response.status === 401) {
               this.props.requireAuth();
           }
        });
    }

    joinRoom(roomId) {
        this.props.joinRoom(roomId, this.socket);
    }

    createRoom() {
        this.props.createRoom(this.socket);
    }

    startGame() {
        this.props.startGame(this.props.roomId, this.socket);
    }
    render() {
        if (this.props.authError != null) {
            return(
                <div>
                    <h1>ERROR: {this.props.authError}</h1>
                </div>
            );
        }

        if (this.props.gameError != null) {
            return(
                <div>
                    <h1>ERROR: {this.props.gameError}</h1>
                </div>
            );
        }

        if (this.props.game != null && this.props.game.started) {
            return(
              <div>
                  <QuizPage socket={this.socket}/>
              </div>
            );
        }

        if (this.props.roomId === null) {
            return (
                <div>
                    <h1>Available Games</h1>
                    <div>
                        <GameList selectRoom={this.joinRoom}/>
                        <div className="hoverBtn" onClick={this.createRoom}>Create Room</div>
                    </div>
                </div>
            );
        }

        return(
          <div>
              <h1>You're in room: ${this.props.roomId}</h1>
              <h2>Participants</h2>
              <ul>
                  {this.props.game.participants.map(participant =>
                      <li key={participant.name}>Player: {participant.name}</li>
                  )}
              </ul>
              {this.props.roomId === this.props.userId && this.props.game.participants.length > 1 &&
                <div className="hoverBtn" onClick={this.startGame}>Start Quiz</div>
              }
          </div>
        );
    }
}

GamePage.propTypes = {
    authenticated: PropTypes.bool,
    userId: PropTypes.string,
    authError: PropTypes.string,
    gameError: PropTypes.string,
    requireAuth: PropTypes.func,
    joinRoom: PropTypes.func,
    createRoom: PropTypes.func,
    startGame: PropTypes.func,
    getRooms: PropTypes.func,
    forfeitGame: PropTypes.func,
    refreshRoom: PropTypes.func,
    refreshPlayer: PropTypes.func,
    game: PropTypes.object,
    games: PropTypes.array,
    roomId: PropTypes.string
};

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        userId: state.auth.userId,
        authError: state.auth.error,
        gameError: state.game.error,
        game: state.game.game,
        games: state.game.games,
        roomId: state.game.roomId,
        player: state.game.player
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        requireAuth: () => {
            dispatch({type: REQUIRES_AUTHENTICATION});
        },
        joinRoom: (roomId, socket) => {
            dispatch(joinRoom(roomId, socket));
        },
        createRoom: (socket) => {
            dispatch(createRoom(socket));
        },
        getRooms: () => {
            dispatch(getRooms());
        },
        forfeitGame: () => {
            dispatch(forfeitGame());
        },
        refreshRoom: (roomId) => {
            dispatch(refreshRoom(roomId));
        },
        startGame: (roomId, socket) => {
            dispatch(startGame(roomId, socket));
        },
        refreshPlayer: () => {
            dispatch(getSelfPlayer());
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GamePage));