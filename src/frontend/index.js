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

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

const user = localStorage.getItem('user');
if (user) {
    store.dispatch({type: AUTHENTICATED, data: {userId: user}});
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);