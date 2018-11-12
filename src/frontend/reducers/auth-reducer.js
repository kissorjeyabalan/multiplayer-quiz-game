import {AUTHENTICATED, UNAUTHENTICATED, ERROR} from "../actions/action-types";

export default function (state={}, action) {
    switch(action.type) {
        case AUTHENTICATED:
            return { ...state, authenticated: true, userId: action.data.userId};
        case UNAUTHENTICATED:
            return { ...state, authenticated: false, userId: null};
        case ERROR:
            return { ...state, error: action.data};
        default:
            return state;
    }
}