const mysqlConnection = require('../db/connection')
require('dotenv').config()

module.exports = (passport, localStrategy, jwtStrategy, extractJwt) => {
    passport.use('local', new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        mysqlConnection.query(`SELECT * FROM ${process.env.DB_DATABASE}.users WHERE username = ?`, username, async (err, results) => {
            if(err) {
                return done(null, false, { message: 'User does not exist' })
            } 
            return done(null, results, { message: 'Sign in successful' })
        })
    }))

    // verify user token
    passport.use(new jwtStrategy({
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    }, (token, done) => {
        try {
            return done(null, token.id)
        } catch(error) {
            done(error)
        }
    })) 
}