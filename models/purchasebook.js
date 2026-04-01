'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PurchaseBook.belongsTo(models.Book, { foreignKey: "BookId" })
      PurchaseBook.belongsTo(models.Purchase, { foreignKey: "PurchaseId" })
      // define association here
    }
  }
  PurchaseBook.init({
    PurchaseId: DataTypes.INTEGER,
    BookId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PurchaseBook',
  });
  return PurchaseBook;
};