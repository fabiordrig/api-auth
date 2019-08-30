const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../auth/config')

// 86400 === 24H
const TOKEN_EXPIRE_TIME = 86400


const INVALID_CREDENDTIALS = 'Credencial Inválida'


const autenticar = async (idCliente) => {
  
  let cliente = await servicesCliente.buscarClientePorId(idCliente)

  if (!cliente){
    return Promise.resolve({erro: true, status: 403, message: INVALID_CREDENDTIALS, codigo: 'CREDENCIAL_INVALIDA'})
  }
  //const clienteValido = renovarToken || bcrypt.compareSync(firebaseId, usuario.usuario.firebaseId)
  
  JSON.stringify(cliente)
  
  return autenticacaoJwt(cliente)

}


const autenticacaoJwt = (cliente) => {

  let sessao = {
    id_cliente: cliente.get('id_cliente'),
    nome_cliente: cliente.get('nome_cliente')
  }

  let dadosRefresh = {
    nome_cliente: cliente.get('nome_cliente'),
    podeRenovar: true
  }
  let refreshToken = jwt.sign(dadosRefresh, config.secret, {
    expiresIn: TOKEN_EXPIRE_TIME,
    subject: cliente.get('nome_cliente')
  })

  let token = jwt.sign(sessao, config.secret, {
    expiresIn: TOKEN_EXPIRE_TIME,
    subject: cliente.get('nome_cliente')
  })

  return { dados: sessao, token: token, auth: true, refreshToken: refreshToken }

}

module.exports = {
  autenticacaoJwt,
  autenticar
}