const db = require('../data/connection')

module.exports = {
    addUser,
    findUsers,
    findUsersBy,
    findUserById
}

function addUser(newUser) {
    return db('users')
        .insert(newUser, 'id')
        .then(([id]) => {
            return findUserById(id)
        })
}

function findUsers() {
    return db('users as u')
        .select('u.id', 'u.username', 'u.department')
        .orderBy('u.id')
}

function findUsersBy(filter) {
    return db('users')
    .where(filter)
    .orderBy('id')
}

function findUserById(id) {
    return db('users')
    .where({id})
    .first()
}