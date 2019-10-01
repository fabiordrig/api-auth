'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
//const crypto = require('crypto');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const moment = require('moment')
const sequelize_fixtures = require('sequelize-fixtures');

let algorithm = 'aes-256-ctr'

//function decryptUser(text){
 // let decipher = crypto.createDecipher(algorithm,config.username)
 // let dec = decipher.update(text,'hex','utf8')
  //dec += decipher.final('utf8');
  //return dec;
//}

//function decryptPass(text){
 // let decipher = crypto.createDecipher(algorithm,config.password)
  //let dec = decipher.update(text,'hex','utf8')
  //dec += decipher.final('utf8');
  //return dec;
//}

//let user = decryptUser(config.username)
//let passw = decryptPass(config.password)

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const SINCRONIZAR = false
const FORCE_DB = false
const FORCE_INSERT_DB = false



// this create table if not exists
if( SINCRONIZAR ) {
  sequelize.sync({force: FORCE_DB}).then( () => {

    if(FORCE_DB || FORCE_INSERT_DB) {

      sequelize_fixtures.loadFile(`${__dirname}/../data_import/*.json`, db, {
          modifyFixtureDataFn: (data) => {
            return data;
          }
      }).then( () => {
          console.info('Import de dados de teste finalizado com sucesso.');
      }).catch( (err) =>  console.error(err));
    }
  })
}

module.exports = db;