import {
    JOINED_ROOM,
    REFRESHED_LOBBY,
    REFRESHED_ROOM,
    GAME_FORFEITED,
    REFRESHED_PLAYER,
    GAME_ERROR
} from "../actions/action-types";
import appState from './app-state';

export default function (state = appState.game, action) {
    switch(action.type) {
        case JOINED_ROOM:
            return { ...state, roomId: action.data.roomId, game: action.data.game};
        case REFRESHED_LOBBY:
            return { ...state, games: action.data.games};
        case REFRESHED_ROOM:
            console.log("REFRESHING ROOM WITH", action);
            return { ...state, roomId: action.data.roomId, game: action.data.game};
        case REFRESHED_PLAYER:
            console.log("REFRESHING PLAYER WITH", action);
            return { ...state, player: action.data.player};
        case GAME_FORFEITED:
            return { ...state, roomId: null, game: null};
        case GAME_ERROR:
            return { ...state, error: action.data.error};
        default:
            return state;
    }
}