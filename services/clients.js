const { db, sequelize } = require("../db/models");
const utils = require("../utils");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

const listarClientes = () => {
  return db.clients.findAll();
};

const buscarClientePorId = (idCliente) => {
  let opcoes = {
    where: {
      idCliente: idCliente,
    },
    include: ["usuarioCliente"],
  };

  return db.clients.findOne(opcoes);
};

const salvarCliente = async (data, idCliente) => {
  if (!data) return utils.promessas.retornaErro("Objeto data está vazio");

  let cliente = {
    nomeCliente: data.nomeCliente,
  };

  cliente = utils.limpaObjeto(cliente);

  if (idCliente) {
    let opcoes = {
      where: {
        idCliente: idCliente,
      },
    };
    return db.clients.update(cliente, opcoes);
  }

  return sequelize.transaction((t) => {
    return db.clients.create(cliente, { transaction: t }).then((clientCreated) => {
      let isAdmin = data.isAdmin;

      let newUser = {
        email: data.email,
        senha: bcrypt.hashSync(data.senha, saltRounds),
        idClient: data.idClient,
        isAdmin,
      };

      return db.user.create(newUser);
    });
  });
};

const excluirCliente = async (idCliente) => {
  let opcoes = {
    where: {
      idCliente: idCliente,
    },
  };

  db.clients.destroy(opcoes);
};

module.exports = {
  listarClientes,
  salvarCliente,
  excluirCliente,
  buscarClientePorId,
};
