"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const glob = require("glob"),
  asyncLib = require("async"),
  winston = require("../config/winston"),
  rootPath = path.normalize(__dirname + "/../");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
sequelize.authenticate().then(async () => {
  winston.info("Connected to the database");
 

  glob("app/modules/*/models/*.js", (err, files) => {
    winston.info("models are loading ...");
    let model;
    asyncLib.forEach(
      files,
      (file, cb) => {
        winston.info("Loading model file " + file);
        model = require(path.join(rootPath, file))(
          sequelize,
          Sequelize.DataTypes
        );
        db[model.name] = model;
      },
      (err) => {
        Object.keys(db).forEach((modelName) => {
          if (db[modelName].options.hasOwnProperty("associate")) {
            db[modelName].options.associate(db);
          }
        });
        
        
      }
    );
    sequelize
          .sync()
          .then(() => {
            sequelize
              .authenticate()
              .then(() => {
                // let dbSeeding = require("./dbSeed");
                // dbSeeding(db, sequelize);
                winston.info("Connection has been established successfully.");
              })
              .catch((err) => {
                winston.error(
                  "Unable to connect to the database:",
                  err.message ? err.message : err
                );
              });
          })
          .catch((err) => {
            winston.error(
              "Unable to connect to the database:",
              err.message ? err.message : err
            );
          });
  });

  // Object.keys(db).forEach((modelName) => {
  //   if (db[modelName].associate) {
  //     db[modelName].associate(db);
  //   }
  // });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
})  .catch((err) => {
  winston.error(
    "Unable to connect to the database:",
    err.message ? err.message : err
  );
});;
module.exports = db;
