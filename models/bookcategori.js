'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookCategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BookCategori.belongsTo(models.Book, { foreignKey: "BookId" })
      BookCategori.belongsTo(models.Categori, { foreignKey: "CategoriId" })
      // define association here
    }
  }
  BookCategori.init({
    BookId: DataTypes.INTEGER,
    CategoriId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BookCategori',
  });
  return BookCategori;
};