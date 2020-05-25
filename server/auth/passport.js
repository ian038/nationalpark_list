const mysqlConnection = require('../db/connection')
const bcrypt = require('bcrypt')

module.exports = (passport, localStrategy, jwtStrategy, extractJwt) => {
    passport.use('local', new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        mysqlConnection.query(`SELECT * FROM dbnationalparklist.users WHERE username = ?`, username, (err, results) => {
            if(err) {
                return done(null, false, { message: 'User does not exist' })
            } 
            const compare = bcrypt.compare(password, results[0].password)
            if(!compare) {
                return done(null, false, { message: 'User and password do not match' })
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