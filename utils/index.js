const promessas = require("./promessas");

const limpaObjeto = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });

  return obj;
};

module.exports = {
  promessas,
  limpaObjeto,
};
