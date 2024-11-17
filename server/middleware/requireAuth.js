const jwt = require('jsonwebtoken');
const User = require('../models/user')

async function requireAuth(req, res, next) {

    try {

        const token = req.cookies.Authorization

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(decoded.sub)

        if (!user) {
            res.sendStatus(401)
        }

        req.user = user

        next()
    } catch (error) {
        console.log(error);
        return res.sendStatus(401)
    }


}

module.exports = requireAuth