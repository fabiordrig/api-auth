const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../auth/config')
const db = require('../db/models')

// 86400 === 24H
const TOKEN_EXPIRE_TIME = 86400


const INVALID_CREDENDTIALS = 'Credencial Inválida'
const saltRounds = 10;

const autenticar = async (dados) => {
  
  
  if (!dados){
    return Promise.resolve({erro: true, status: 403, message: INVALID_CREDENDTIALS, codigo: 'CREDENCIAL_INVALIDA'})
  }

  
  let op = {
    where: dados.id
  }

  return db.cliente.findOne(op).then( cliente => {
    if (!cliente){
      return Promise.resolve({erro: true, status: 403, message: INVALID_CREDENDTIALS, codigo: 'CREDENCIAL_INVALIDA'})
    }

    let hash = bcrypt.hashSync(cliente.senha_hash, saltRounds)
    console.log('>>>>>>>>',hash)
    let senha = bcrypt.compareSync(cliente.senha_hash, hash);
    console.log('>>>>>>>>',senha)

    if (!senha) {
      return Promise.resolve({erro: true, status: 403, message: INVALID_CREDENDTIALS, codigo: 'CREDENCIAL_INVALIDA'})
    }
    
    let token = {
      idCliente: cliente.id,
      email: cliente.email
    }

    JSON.stringify(token)
    return autenticacaoJwt(token)
  })

}

const autenticacaoJwt = (dados) => {

  let sessao = {
    idCliente: dados.id,
    email: dados.email
  }

  let dadosRefresh = {
    email: dados.email,
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

const cadastrarUsuario = (dados) => {
  
  if (!dados){
    return Promise.resolve({erro: true, status: 403, message: INVALID_CREDENDTIALS, codigo: 'CREDENCIAL_INVALIDA'})
  }

  let cliente = {
    email: dados.email,
    senha_hash: bcrypt.hashSync(dados.senha, saltRounds)
  }

  return db.cliente.create(cliente)

}

module.exports = {
  autenticacaoJwt,
  autenticar,
  cadastrarUsuario
}