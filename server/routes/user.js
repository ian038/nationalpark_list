const router = require('express').Router()
const { getAll, remove } = require('../controller/user')

router.get('/', getAll)

router.post('/add', )

router.get('/delete', remove)

module.exports = router