const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    //must verify that user is logged in
    const token = req.headers.authorization
    const secret = process.env.JWT_SECRET || 'keep it secret, keep it safe!'

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err){                //something wrong with the token

                res.status(401).json({message: "invalid token"})
            } else {                //token is good! Provide the data!
                req.jwt = decodedToken
                next()
            }
        })
    } else {
        res.status(401).json({ message: 'You shall not pass!' })
    }
}