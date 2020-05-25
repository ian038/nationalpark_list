const mysqlConnection = require('../db/connection')
const bcrypt = require('bcrypt')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')
require('../auth/passport')(passport, localStrategy, jwtStrategy, extractJwt)

exports.signUp = (req, res) => {
    const { username, email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const encryptedPassword = bcrypt.hashSync(password, salt)
    const user = {
        "username": username,
        "email": email,
        "password": encryptedPassword,
        "salt": salt
    }
    mysqlConnection.query(`INSERT INTO users SET ? `, user, (err, results) => {
        if(err) {
            res.json({ error: err.sqlMessage })
        } else {
            res.json({ data: results })
        }
    }) 
}

exports.signIn = (req, res, next) => {
    passport.authenticate('local', (error, user) => {
        console.log(user)
        if(error || !user) {
            res.status(400).json({ error: 'User is not registered. Please sign up' })
        }
        req.logIn(user, { session: false }, (error) => {
            if(error) {
                res.status(400).json({ error: 'User is not registered. Please sign up' })
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
            res.cookie('t', token, { expire: new Date() + 9999 })
            const { id, username, email } = user[0]
            return res.json({ token, user: { id, username, email } })
        })
    })(req, res, next)
}

exports.signOut = (req, res) => {
    res.clearCookie('t')
    res.json('Sign out success!')
}

exports.requireSignIn = passport.authenticate('jwt', { session: false })

exports.isAuth = (req, res, next) => {
    let user = req.profile.id == req.user
    if(!user) {
        return res.status(400).json({ error: 'Access denied' })
    }
    next()
}