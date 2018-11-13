import * as type from './action-types';
import axios from 'axios';

const URL = '/api/';

export function joinRoom(roomId, socket) {
    return async (dispatch) => {
        axios.post(`${URL}/games/${roomId}`).then(res => {
                dispatch({type: type.JOINED_ROOM, data: {roomId: res.data.roomId, game: res.data.game}});
                socket.emit('join-room', {roomId: res.data.roomId});
            }).catch(() => {
            dispatch({type: type.GAME_ERROR, data: 'Failed joining game!'});
        });
    };
}

export function createRoom(socket) {
    return async (dispatch) => {
        axios.post(`${URL}/games`).then(res => {
            dispatch({type: type.JOINED_ROOM, data: {roomId: res.data.roomId, game: res.data.game}});
            console.log("socket", socket);
            socket.emit('room-created', {roomId: res.data.roomId});
        }).catch(() => {
            dispatch({type: type.GAME_ERROR, data: 'Failed creating room!'});
        });
    };
}

export function getRooms() {
    return async (dispatch) => {
        axios.get(`${URL}/games`).then(res => {
            dispatch({type: type.REFRESHED_LOBBY, data: {games: res.data.games}});
        });
    };
}

export function forfeitGame() {
    return async (dispatch) => {
        axios.post(`${URL}/user/forfeit`);
        dispatch({type: type.GAME_FORFEITED});
    };
}

export function refreshRoom(roomId) {
    return async (dispatch) => {
        axios.get(`${URL}/games/${roomId}`).then(res => {
            console.log("refreshed", res);
            dispatch({type: type.REFRESHED_ROOM, data: {roomId: res.data.roomId, game: res.data.game}});
        });
    };
}

export function startGame(roomId, socket) {
    return async () => {
        axios.post(`${URL}/games/${roomId}/start`).then(() => {
            socket.emit('game', {type: 'REFRESH_ROOM', roomId: roomId});
        });
    };
}

export function getSelfPlayer() {
    return async (dispatch) => {
        axios.get(`${URL}/user/player`).then((res) => {
            dispatch({type: type.REFRESHED_PLAYER, data: {player: res.data.player}});
        }).catch(err => console.log(err));
    };
}

export function manualDispatch(type, data) {
    return async (dispatch) => {
        dispatch({type: type, data: data});
    };
}