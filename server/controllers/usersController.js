const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const signUp = async (req, res) => {

    try {
        const { email, password } = req.body;

        const hashedPW = bcrypt.hashSync(password, 8);

        const user = await User.create({
            email,
            password: hashedPW
        })

        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
    }

}

const logIn = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email
        })

        if (!user) {
            console.log("bruh");
            return res.sendStatus(401)
        }

        const matchPW = bcrypt.compareSync(password, user.password);

        if (!matchPW) {
            console.log("lmfao");
            return res.sendStatus(401)
        }

        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30
        const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET_KEY);

        res.cookie("Authorization", token, { expires: new Date(exp), httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" })

        res.sendStatus(200)

    } catch (error) {
        console.log(error);
        res.sendStatus(400)
    }
}

const logOut = (req, res) => {
    try {
        res.clearCookie("Authorization");
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

const checkAuth = (req, res) => {
    try {
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }

}

module.exports = {
    signUp,
    logIn,
    logOut,
    checkAuth
};