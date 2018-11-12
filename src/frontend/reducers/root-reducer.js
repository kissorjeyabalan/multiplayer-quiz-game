import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import gameReducer from './game-reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    game: gameReducer
});

export default rootReducer;