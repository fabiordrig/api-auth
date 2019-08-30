var express = require('express');
var router = express.Router();

/* GET home page. */
const auth = require('./auth')
router.use('/auth', auth)

module.exports = router;
