const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../auth/config");
const { db } = require("../db/models");

// 86400 === 24H
const TOKEN_EXPIRE_TIME = 86400;

const INVALID_CREDENDTIALS = "Credencial Inválida";
const saltRounds = 10;

const autenticar = async (dados) => {
  if (!dados) {
    return Promise.resolve({
      erro: true,
      status: 404,
      message: "NOT_FOUND",
      codigo: "NOT_FOUND",
    });
  }

  let op = {
    where: {
      email: dados.email,
    },
  };
  console.log(dados, op);
  return db.user.findOne(op).then((user) => {
    if (!user) {
      return Promise.resolve({
        erro: true,
        status: 404,
        message: "NOT_FOUND",
        codigo: "NOT_FOUND",
      });
    }

    let hash = bcrypt.hashSync(user.senha, saltRounds);

    let senha = bcrypt.compareSync(user.senha, hash);

    if (!senha) {
      return Promise.resolve({
        erro: true,
        status: 403,
        message: INVALID_CREDENDTIALS,
        codigo: "CREDENCIAL_INVALIDA",
      });
    }

    let token = {
      idUser: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      idClient: user.idClient,
    };

    JSON.stringify(token);
    return autenticacaoJwt(token);
  });
};

const getAllUsers = async (dados) => {
  if (!dados) {
    return Promise.resolve({
      erro: true,
      status: 404,
      message: "NOT_FOUND",
      codigo: "NOT_FOUND",
    });
  }

  if (!dados.onlyAdmin) {
    op.where.isAdmin = dados.onlyAdmin;
  }

  return db.user.findAll({
    where: { idClient: dados.idClient, isAdmin: dados.onlyAdmin },
  });
};

const autenticacaoJwt = (dados) => {
  let sessao = {
    idUser: dados.id,
    email: dados.email,
    isAdmin: dados.isAdmin,
    idClient: dados.idClient,
  };

  let dadosRefresh = {
    email: dados.email,
    podeRenovar: true,
  };
  let refreshToken = jwt.sign(dadosRefresh, config.secret, {
    expiresIn: TOKEN_EXPIRE_TIME,
    subject: dados.email,
  });

  let token = jwt.sign(sessao, config.secret, {
    expiresIn: TOKEN_EXPIRE_TIME,
    subject: dados.email,
  });

  return {
    dados: sessao,
    token: token,
    auth: true,
    refreshToken: refreshToken,
  };
};

const cadastrarUsuario = (dados, isAdmin) => {
  if (!dados) {
    return Promise.resolve({
      erro: true,
      status: 403,
      message: INVALID_CREDENDTIALS,
      codigo: "CREDENCIAL_INVALIDA",
    });
  }

  let newUser = {
    email: dados.email,
    senha: bcrypt.hashSync(dados.senha, saltRounds),
    idClient: dados.idClient,
    isAdmin,
  };

  return db.user.create(newUser);
};

module.exports = {
  autenticacaoJwt,
  autenticar,
  getAllUsers,
  cadastrarUsuario,
};
