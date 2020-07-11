const services = require("../services");

const listarClientes = (req, res) => {
  services.clients
    .listarClientes(req.query)
    .then((listarClientes) => res.status(200).send(listarClientes))
    .catch((erro) => {
      console.log(erro);
      res.status(500).send(erro);
    });
};

const salvarCliente = (req, res) => {
  let data = req.body;
  let idCliente = req.params.id;

  return services.clients
    .salvarCliente(data, idCliente)
    .then((novoCliente) => {
      res.status(201).send(novoCliente);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).send(erro);
    });
};

const buscarClientePorId = (req, res) => {
  let idCliente = req.params.id;

  services.clients
    .buscarClientePorId(idCliente)
    .then((editarCliente) => {
      if (!editarCliente) {
        res.status(404).send();
      } else {
        res.status(200).send(editarCliente);
      }
    })
    .catch((erro) => res.status(500).send(erro));
};

const excluirCliente = (req, res) => {
  let idCliente = req.params.id;

  services.clients
    .excluirCliente(idCliente)
    .then((cliente) => {
      if (cliente == 1) {
        return res.status(200).send({ message: "OK" });
      }
      if (cliente == 0) {
        return res.status(204).send({ message: "No Content" });
      }
      return res.status(202).send({ message: "Accepted" });
    })
    .catch((error) => res.status(500).send(error));
};

module.exports = {
  listarClientes,
  salvarCliente,
  buscarClientePorId,
  excluirCliente,
};
