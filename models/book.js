'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.belongsTo (models.Author, {foreignKey: "AuthorId"})

      Book.belongsToMany(models.Categori, {
        through: models.BookCategori,
        foreignKey: "BookId"      
      })
      
      Book.belongsToMany(models.Purchase, {
        through: models.PurchaseBook,
        foreignKey: "BookId"
      })
    }

    static async getAllBooks() {
      return await this.findAll({
        include: ['Author', 'Categoris']
      })
    }

  get priceFormat() {
    return `Rp ${this.price.toLocaleString('id-ID')}`
  }
  }
  Book.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Price is required'
        },
        min: {
          args: [1000],
          msg: 'Price must be at least 1000'
        }
      }
    },
    AuthorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Author must be selected'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Book',


    hooks: {
      beforeCreate(book) {
        book.name = book.name.trim()
      },

      beforeUpdate(book) {
        book.name = book.name.trim()
      },

      afterCreate(book) {
        console.log(`Book "${book.name}" created`)
      }
    }
  });
  return Book;
};