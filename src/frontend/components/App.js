import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import LoginPage from "../components/auth/LoginPage";
import RegisterPage from "../components/auth/RegisterPage";
import HomePage from "../components/home/HomePage";
import GamePage from "../components/game/GamePage";
import HeaderBar from "../components/header/HeaderBar";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <HeaderBar/>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/signup" component={RegisterPage} />
                        <Route exact path="/games" component={GamePage} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;