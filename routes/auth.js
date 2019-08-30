var express = require('express');
var router = express.Router();

const controllers = require('../controllers')
router
  .post('/login', controllers.autenticacao.autenticar)
  .get('/renovar', controllers.autenticacao.renovarToken)

module.exports = router