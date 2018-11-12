/**
 * Partially taken from
 * https://github.com/arcuri82/pg6300/blob/master/les11/connect4-v2/src/server/app.js
 */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const socket = require('./sockets/handler');
const authRoute = require('./routes/auth-route');
const Users = require('./db/users');

const port = 8080;
const app = express();
const server = require('http').Server(app);

app.use(bodyParser.json());
app.use(session({
    secret: 'fbyHV6DRoE$tV(et>MPdPmBa',
    resave: false,
    saveUninitialized: false
}));
app.use(express.static('public'));

passport.use(new LocalStrategy(
    {
        usernameField: 'userId',
        passwordField: 'password'
    },
    function (userId, password, done) {
        const ok = Users.verifyUser(userId, password);
        if (!ok) {
            return done(null, false, {message: 'Invalid username or password'});
        }
        const user = Users.getUser(userId);
        return done(null, user);
    }
));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    const user = Users.getUser(id);
    if (user !== null) {
        done(null, user);
    } else {
        done(null, false);
    }
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', authRoute);
app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

socket.start(server);
server.listen(port, () => {
    console.log("Starting server!");
});

module.exports = app;