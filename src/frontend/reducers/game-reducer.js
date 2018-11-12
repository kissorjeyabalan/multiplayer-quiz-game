import {JOINED_ROOM, REFRESHED_LOBBY, REFRESHED_ROOM, GAME_FORFEITED} from "../actions/action-types";
import appState from './app-state';

export default function (state = appState.game, action) {
    switch(action.type) {
        case JOINED_ROOM:
            return { ...state, roomId: action.data.roomId, game: action.data.game};
        case REFRESHED_LOBBY:
            return { ...state, games: action.data.games};
        case REFRESHED_ROOM:
            return { ...state, roomId: action.data.roomId, game: action.data.game};
        case GAME_FORFEITED:
            return { ...state, roomId: null, game: null};
        default:
            return state;
    }
}