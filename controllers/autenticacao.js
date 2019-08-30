const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../auth/config')
const services = require('../services')


// 86400 === 24H
const TOKEN_EXPIRE_TIME = 86400
// 900 === 15MIN
const REFRESH_TIME = 900
const INVALID_CREDENDTIALS = 'Credencial inválida'

const ERROR_MESSAGE_NO_TOKEN_PROVIDED = 'Token não encontrado'
const ERROR_MESSAGE_FAILED_AUTH = 'Falha na autenticação'


function autenticar (req, res) {
  
  let idCliente = req.body.idCliente
  //let firebaseId = req.body.firebaseId
  
  
  return services.autenticacao.autenticar(idCliente)
    .then( autenticacao => {
      if(autenticacao.erro) return res.status(autenticacao.status).send(autenticacao)
      
      return res.status(200).send(autenticacao)
    })
}

function renovarToken (req, res) {
  const token = req.headers['x-access-token']
  jwt.verify(token, config.secret, (err, decoded) => {
    
    if (err) return res.status(403).send({ erro: true, mensagem: ERROR_MESSAGE_FAILED_AUTH })
    
    let idCliente = decoded.idCliente
    //let firebaseId = null
    
    if(decoded.podeRenovar !== true) return res.status(403).send({ erro: true, mensagem: ERROR_MESSAGE_FAILED_AUTH })
    
    return services.autenticacao.autenticar(idCliente)
      .then( autenticacao => {
        if(autenticacao.erro) return res.status(autenticacao.status).send(autenticacao)
        return res.status(200).send(autenticacao)
      })
  })
  
}

module.exports = {
  autenticar,
  renovarToken
}