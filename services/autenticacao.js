const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../auth/config')
const db = require('../db/models')

// 86400 === 24H
const TOKEN_EXPIRE_TIME = 86400


const INVALID_CREDENDTIALS = 'Credencial Inválida'
const saltRounds = 10;

const autenticar = async (dados) => {
  
  
  let crypt = {}
  if (!dados){
    return Promise.resolve({erro: true, status: 403, message: INVALID_CREDENDTIALS, codigo: 'CREDENCIAL_INVALIDA'})
  }
  
  
  crypt =  {
    email: bcrypt.hashSync(dados.email, saltRounds),
    senha: bcrypt.hashSync(dados.senha, saltRounds)
  }

  JSON.stringify(crypt)
  return autenticacaoJwt(crypt)

}


const autenticacaoJwt = (dados) => {

  let sessao = {
    email: dados.email,
    senha: dados.senha
  }

  let dadosRefresh = {
    email: dados.email,
    senha: dados.senha,
    podeRenovar: true
  }
  let refreshToken = jwt.sign(dadosRefresh, config.secret, {
    expiresIn: TOKEN_EXPIRE_TIME,
    subject: dados.email
  })

  let token = jwt.sign(sessao, config.secret, {
    expiresIn: TOKEN_EXPIRE_TIME,
    subject: dados.email
  })

  return { dados: sessao, token: token, auth: true, refreshToken: refreshToken }

}

module.exports = {
  autenticacaoJwt,
  autenticar
}