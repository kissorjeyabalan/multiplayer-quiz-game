/*
* Taken from
* https://github.com/arcuri82/pg6300/blob/master/les11/connect4-v2/src/server/ws/tokens.js
* */

const crypto = require('crypto');

const tokens = new Map();

const randomId = () => {
    return crypto.randomBytes(10).toString('hex');
};

const createToken = (userId) => {
    console.log("created ws token for " + userId);
    const t = randomId();
    tokens.set(t, userId);
    return t;
};

const consumeToken = (t) => {
    const userId = tokens.get(t);
    tokens.delete(t);
    return userId;
};

module.exports = {createToken, consumeToken};