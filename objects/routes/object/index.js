const router = require('express').Router()

router.get('/:key', require('./show'))
router.post('/', require('./create'))

module.exports = router
