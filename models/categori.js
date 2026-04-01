'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Categori.belongsToMany(models.Book, {
        through: models.BookCategori,
        foreignKey: "CategoriId"
      })
    }
  }
  Categori.init({
    categoriName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categori',
  });
  return Categori;
};