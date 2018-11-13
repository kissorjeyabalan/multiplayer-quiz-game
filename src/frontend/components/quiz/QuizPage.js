import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Score from './Score';
import Timer from './Timer';
import Question from './Question';
import GameOver from './GameOver';
import {manualDispatch, refreshRoom} from '../../actions/game-actions';
import * as type from '../../actions/action-types';

class QuizPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 20
        };

        this.submitAnswer = this.submitAnswer.bind(this);
    }

    componentDidMount() {
        console.log("YA PROPS BOI", this.props);
        this.props.socket.on('game', (data) => {
            if (data.type === 'REFRESH_PLAYER') {
                this.props.manualDispatch(type.REFRESHED_PLAYER, {player: data.player});
                this.setState({timer: this.props.player.timer});
                if (this.props.player.finished) {
                    clearInterval(this.timerInterval);
                    this.props.refreshRoom(this.props.roomId);
                }
            }
            if (data.type === 'REFRESH_ROOM') {
                this.props.manualDispatch(type.REFRESHED_ROOM, data.data);
            }
        });

        this.timerInterval = setInterval(() => {
            if (this.state.timer != null) {
                let timer = this.state.timer - 1;
                if (timer >= 0) {
                    this.setState({timer: timer});
                }
            }
        }, 1000);
    }

    submitAnswer(index) {
        this.props.socket.emit('game', {type: 'SUBMIT_ANSWER', answer: index});
    }

    render() {
        return (
            <div>
                <h1>Quiz about {this.props.quiz.topic}</h1>
                <Score score={this.props.player.score}/>
                <Timer timer={this.state.timer} playerFinished={this.props.player.finished}/>
                {
                    !this.props.player.finished ?
                        <Question
                            question={this.props.quiz.questions[this.props.player.question]}
                            onAnswer={this.submitAnswer}
                        />
                    :
                        <GameOver gameFinished={this.props.game.finished} players={this.props.players}/>
                }
            </div>
        );
    }
}


QuizPage.propTypes = {
    game: PropTypes.object,
    quiz: PropTypes.object,
    players: PropTypes.array,
    player: PropTypes.object,
    socket: PropTypes.object.isRequired,
    manualDispatch: PropTypes.func,
    refreshRoom: PropTypes.func,
    roomId: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        game: state.game.game,
        quiz: state.game.game.quiz,
        players: state.game.game.participants,
        player: state.game.player,
        roomId: state.game.roomId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        manualDispatch: (type, data) => {
            dispatch(manualDispatch(type, data));
        },
        refreshRoom: (roomId) => {
            dispatch(refreshRoom(roomId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizPage);
