/*
Based on
https://github.com/arcuri82/pg6300/blob/master/les11/connect4-v2/src/server/db/users.js
 */

const users = new Map();

function getUser(id) {
    return users.get(id);
}

function verifyUser(id, password) {
    const user = getUser(id);
    if (user == null) {
        return false;
    }
    return user.password === password;
}

// Never do this in production - Password should be hashed, salted, peppered++
function createUser(id, password) {
    console.log(users);
    console.log('attempting to create user', id, password);
    if (getUser(id) != null) {
        console.log("not null");
        console.log(getUser(id));
        return false;
    }

    const user = {
        id: id,
        password: password
    };

    console.l
    users.set(id, user);
    console.log(users);
    return true;
}

module.exports = {getUser, verifyUser, createUser};
