const router = require('express').Router()

const UsersModel = require('./users-model')


router.get('/', (req, res) => {
    const department = req.jwt.department
    UsersModel.findUsersBy({ department }).select('id', 'username', 'department') // changed findUsers to findUsersBy department for stretch
        .then(users => {
            res.json({data: users, jwt: req.jwt})
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
})

module.exports = router