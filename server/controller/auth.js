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
    mysqlConnection.query(`SELECT * FROM users`, user, (err, results) => {
        if(err) {
            console.log(err)
        } else if(results[0].username === user.username) {
            return res.status(400).json({ error: 'Username already exists.' })
        } else if(results[0].email === user.email) {
            return res.status(400).json({ error: 'Email already exists' })
        } else {
            mysqlConnection.query(`INSERT INTO users SET ? `, user, (err, results) => {
                if(err) {
                    res.json({ error: err.sqlMessage })
                } else {
                    res.json({ data: results })
                }
            }) 
        }
    })
}

exports.signIn = (req, res, next) => {
    const { password } = req.body
    passport.authenticate('local', (error, user) => {
        if(error || !user[0]) {
            return res.status(400).json({ error: 'User is not registered. Please sign up' })
        }
        req.logIn(user, { session: false }, async (error) => {
            if(error) {
                return res.status(401).json(error)
            }
            const compare = await bcrypt.compare(password, user[0].password)
            if(!compare) {
                return res.status(400).json({ error: 'Username and password does not match' })
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