'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Personal.hasOne (models.User, {foreignKey: "PersonalId"})
    }
  }
  Personal.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bornDate: DataTypes.DATE,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Personal',
  });
  return Personal;
};