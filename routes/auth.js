const express = require("express");
const router = express.Router();

const controllers = require("../controllers");
router
  .post("/authorize", controllers.autenticacao.autenticar)
  .get("/refresh", controllers.autenticacao.renovarToken)
  .post("/login", controllers.autenticacao.cadastrarUsuario)
  .get("/client/:idClient", controllers.autenticacao.userByClient);

module.exports = router;
