const router = require('express').Router()
const { signUp, signIn, signOut, validateRecaptcha } = require('../controller/auth')
const { userSignUpValidator } = require('../validator')

router.post('/validateRecaptcha', validateRecaptcha)

router.post('/signup', userSignUpValidator, signUp)

router.post('/signin', signIn)

router.get('/signout', signOut)

module.exports = router