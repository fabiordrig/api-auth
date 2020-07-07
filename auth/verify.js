const jwt = require("jsonwebtoken");
const config = require("./config");

const ERROR_MESSAGE_NO_TOKEN_PROVIDED = "Token não encontrado";
const ERROR_MESSAGE_FAILED_AUTH = "Falha na autenticação";

function verifyAdminToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res
      .status(403)
      .send({ auth: false, message: ERROR_MESSAGE_NO_TOKEN_PROVIDED });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res
        .status(403)
        .send({ auth: false, message: ERROR_MESSAGE_FAILED_AUTH });

    if (!decoded.usuario) return res.status(400).send();

    if (!decoded.usuario.perfil) return res.status(400).send();

    if (decoded.usuario.perfil !== 9999) return res.status(400).send();

    req.userId = decoded.id;
    req.dataSession = decoded;
    next();
  });
}

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res
      .status(403)
      .send({ auth: false, message: ERROR_MESSAGE_NO_TOKEN_PROVIDED });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res
        .status(403)
        .send({ auth: false, message: ERROR_MESSAGE_FAILED_AUTH });

    req.userId = decoded.id;
    req.dataSession = decoded;
    next();
  });
}

module.exports = {
  verifyToken,
  verifyAdminToken,
};
