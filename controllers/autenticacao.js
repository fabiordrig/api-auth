const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../auth/config");
const services = require("../services");

// 86400 === 24H
const TOKEN_EXPIRE_TIME = 86400;
// 900 === 15MIN
const REFRESH_TIME = 900;
const INVALID_CREDENDTIALS = "Credencial inválida";

const ERROR_MESSAGE_NO_TOKEN_PROVIDED = "Token não encontrado";
const ERROR_MESSAGE_FAILED_AUTH = "Falha na autenticação";

function autenticar(req, res) {
  let dados = {
    email: req.body.email,
    senha: req.body.senha,
  };

  return services.autenticacao.autenticar(dados).then((autenticacao) => {
    if (autenticacao.erro) return res.status(autenticacao.status).send(autenticacao);

    return res.status(200).send(autenticacao);
  });
}
function cadastrarUsuario(req, res) {
  let dados = {
    email: req.body.email,
    senha: req.body.senha,
    idClient: req.body.idClient,
  };

  let isAdmin;
  if (req.query.isAdmin) {
    isAdmin = true;
  } else {
    isAdmin = false;
  }

  return services.autenticacao.cadastrarUsuario(dados, isAdmin).then((autenticacao) => {
    if (autenticacao.erro) return res.status(autenticacao.status).send(autenticacao);

    return res.status(200).send(autenticacao);
  });
}

function userByClient(req, res) {
  let dados = {
    onlyAdmin: req.query.onlyAdmin,
    idClient: req.params.idClient,
  };

  return services.autenticacao.getAllUsers(dados).then((users) => {
    if (users.erro) return res.status(users.status).send(users);
    return res.status(200).send(users);
  });
}

function renovarToken(req, res) {
  const token = req.headers["x-access-token"];
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res.status(403).send({ erro: true, mensagem: ERROR_MESSAGE_FAILED_AUTH });

    let email = req.body.email;
    let senha = req.body.senha;

    if (decoded.podeRenovar !== true)
      return res.status(403).send({ erro: true, mensagem: ERROR_MESSAGE_FAILED_AUTH });

    return services.autenticacao.autenticar(idCliente).then((autenticacao) => {
      if (autenticacao.erro) return res.status(autenticacao.status).send(autenticacao);
      return res.sendStatus(200);
    });
  });
}

module.exports = {
  autenticar,
  renovarToken,
  userByClient,
  cadastrarUsuario,
};
