import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import LoginPage from "../components/auth/LoginPage";
import RegisterPage from "../components/auth/RegisterPage";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/signup" component={RegisterPage} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;