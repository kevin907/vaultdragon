var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/object', require('./object'))

module.exports = router;
