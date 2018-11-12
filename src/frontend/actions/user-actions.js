import * as type from './action-types';
import axios from 'axios';

const URL = '/api/';

export function login(username, password, history) {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${URL}/login`, {userId: username, password: password});
            dispatch({type: type.AUTHENTICATED, data: {userId: res.data.userId}});
            localStorage.setItem('user', res.data.userId);
            history.push('/games');
        } catch(err) {
            dispatch({type: type.ERROR, data: 'Invalid email/password!'});
        }
    };
}

export function signUp(username, password, history) {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${URL}/signup`, {userId: username, password: password});
            dispatch({type: type.AUTHENTICATED, data: {userId: res.data.userId}});
            localStorage.setItem('user', res.data.userId);
            history.push('/games');
        } catch (err) {
            dispatch({type: type.ERROR, data: 'Username is already in use!'});
        }
    };
}