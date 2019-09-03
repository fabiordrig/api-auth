var express = require('express');
var router = express.Router();

const controllers = require('../controllers')
router
  .post('/autenticar', controllers.autenticacao.autenticar)
  .get('/renovar', controllers.autenticacao.renovarToken)
  .post('/login', controllers.autenticacao.cadastrarUsuario)

module.exports = router