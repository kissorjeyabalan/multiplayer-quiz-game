/* eslint-disable no-undef */
/*
Based on
https://github.com/arcuri82/pg6300/blob/master/les11/connect4-v2/src/server/routes/authApi.js
 */
const passport = require('passport');
const express = require('express');
const router = express.Router();
const Tokens = require('../sockets/tokens');
const Users = require('../db/users');

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).json({userId: req.user.id});
});

router.post('/signup', (req, res) => {
    console.log('signup called', req.body);
    const created = Users.createUser(req.body.userId, req.body.password);
    if (!created) {
        res.status(400).send();
        return;
    }

    passport.authenticate('local')(req, res, () => {
        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({userId: req.user.id});
        });
    });
});

router.post('/logout', (req, res) => {
    req.logout();
    res.status(204).send();
});

router.post('/wstoken', (req, res) => {
    if (!req.user) {
        res.status(401).send();
        return;
    }
    const t = Tokens.createToken(req.user.id);
    res.status(201).json({wstoken: t});
});

router.get('/user', (req, res) => {
    if (!req.user) {
        res.status(401).send();
        return;
    }
    res.status(200).json({userId: req.user.id});
});

module.exports = router;