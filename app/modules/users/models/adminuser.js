"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class adminUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      adminUser.belongsTo(models.User,{
        foreignKey:{
          name:'UserId',allowNull: false
        }
      })
    }
  }
  adminUser.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      UserId:{
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "adminUser",
      modelName: "adminUser",
    }
  );
  return adminUser;
};
