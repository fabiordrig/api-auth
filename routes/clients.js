var express = require("express");
var router = express.Router();

const controllers = require("../controllers");
router
  .get("/", controllers.clients.listarClientes)
  .get("/:id", controllers.clients.buscarClientePorId)
  .post("/", controllers.clients.salvarCliente)
  .put("/:id", controllers.clients.salvarCliente)
  .delete("/:id", controllers.clients.excluirCliente);

module.exports = router;
