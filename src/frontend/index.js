import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers/root-reducer';
import {AUTHENTICATED} from './actions/action-types';
import App from './components/App';
import 'babel-polyfill';
import axios from 'axios';
import {logOut} from './actions/user-actions';

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

const user = localStorage.getItem('user');

// Inspired by https://stackoverflow.com/a/48299733
if (user) {
    store.dispatch({type: AUTHENTICATED, data: {userId: user}});
    axios.get('/api/user').catch(() => {
        store.dispatch(logOut());
    });
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);