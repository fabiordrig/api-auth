var express = require("express");
const verifyToken = require("../auth/verify");
var router = express.Router();

/* GET home page. */
const auth = require("./auth");
const cliente = require("./clients");

router.use("/auth", auth);
router.use("/client", verifyToken.verifyToken, cliente);

module.exports = router;
