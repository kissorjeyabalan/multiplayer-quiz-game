import * as type from './action-types';
import axios from 'axios';

const URL = '/api/';

export function login(username, password, history) {
    return async (dispatch) => {
        axios.post(`${URL}/login`, {userId: username, password: password}).then(res => {
                dispatch({type: type.AUTHENTICATED, data: {userId: res.data.userId}});
                localStorage.setItem('user', res.data.userId);
                history.push('/');
            }).catch(() => {
            dispatch({type: type.AUTH_ERROR, data: 'Invalid email/password!'});
        });
    };
}

export function signUp(username, password, history) {
    return async (dispatch) => {
        axios.post(`${URL}/signup`, {userId: username, password: password}).then(res => {
            dispatch({type: type.AUTHENTICATED, data: {userId: res.data.userId}});
            localStorage.setItem('user', res.data.userId);
            history.push('/');
        }).catch(() => {
            dispatch({type: type.AUTH_ERROR, data: 'Username is already in use!'});
        });
    };
}

export function logOut(history) {
    return async (dispatch) => {
        axios.post(`${URL}/logout`).then(() => {
            dispatch({type: type.UNAUTHENTICATED});
           localStorage.removeItem('user');
           history.push('/');
        }).catch((err) => {
            dispatch({type: type.AUTH_ERROR, data: `Unknown error occured: ${err}`});
        });
    };
}