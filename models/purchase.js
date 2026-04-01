'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Purchase.belongsTo(models.User, { foreignKey: "UserId" })
      
      Purchase.belongsToMany(models.Book, {
        through: models.PurchaseBook,
        foreignKey: "PurchaseId"
      })
    }
  }
  Purchase.init({
    UserId: DataTypes.INTEGER,
    purchasedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Purchase',
    hooks: {
      beforeCreate(purchase) {
        if (!purchase.purchasedDate) {
          purchase.purchasedDate = new Date()
        }
      }
    }
  });
  return Purchase;
};