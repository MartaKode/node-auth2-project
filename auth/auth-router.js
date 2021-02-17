const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = require('express').Router()

const UsersModel = require('../users/users-model')


//``````REGISTER POST``````````
router.post('/register', (req, res) => {

    if (!req.body.password || !req.body.username || !req.body.department) {
        res.status(400).json({ message: 'Must provide required fields username and/or password and/or department' })
    }

    const rounds = process.env.BCRYPT_ROUNDS || 12

    //hash password:
    const hash = bcryptjs.hashSync(req.body.password, rounds)

    req.body.password = hash

    UsersModel.addUser(req.body)
        .then(newUser => {
            const token = makeJwtToken(newUser)

            res.json({ data: newUser, token }) //--> Give frontend the token so they can login through register as well
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })


})

//``````````LOGIN POST``````````
router.post('/login', (req, res) => {

    if (!req.body.password || !req.body.username) {
        res.status(400).json({ message: 'Must provide required fields username and/or password' })
    }

    const { username, password } = req.body

    UsersModel.findUsersBy({ username })
        .then(([user]) => {
            if (user && bcryptjs.compareSync(password, user.password)) {
                const token = makeJwtToken(user)

                res.json({ message: `Welcome to the API ${user.username}`, token })
            } else {
                res.status(401).json({message: 'You shall not pass!'})
            }
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })

})



//``````TOKEN helpers```````````
function makeJwtToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    }

    const secret = process.env.JWT_SECRET || 'keep it secret, keep it safe!'

    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, secret, options)
}

module.exports = router