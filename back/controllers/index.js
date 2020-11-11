const express = require('express')

let router = express.Router()

router.use('/user', require('./user'));
router.use('/list', require('./list'));
router.use('/task', require('./task'));
router.use('/group', require('./group'));

module.exports = router;