import {AUTHENTICATED, UNAUTHENTICATED, AUTH_ERROR, REQUIRES_AUTHENTICATION} from "../actions/action-types";
import appState from './app-state';

export default function (state = appState.auth, action) {
    switch(action.type) {
        case AUTHENTICATED:
            return { ...state, authenticated: true, userId: action.data.userId, error: null};
        case UNAUTHENTICATED:
            return { ...state, authenticated: false, userId: null, error: null};
        case REQUIRES_AUTHENTICATION:
            return { ...state, authenticated: false, userId: null, error: 'You must be logged in to access this page.'};
        case AUTH_ERROR:
            return { ...state, error: action.data};
        default:
            return state;
    }
}