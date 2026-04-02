'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require ('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo (models.Personal, {foreignKey: "PersonalId"})
      User.hasMany(models.Purchase, { foreignKey: "UserId" })
    }
  }
  User.init({
    PersonalId: DataTypes.INTEGER,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Email already used'
        },
        validate: {
          notNull: {
            msg: 'Email is required'
          },
          notEmpty: {
            msg: 'Email is required'
          },
          isEmail: {
            msg: 'Invalid email format'
          }
        }
      },
    password: { 
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Password is required'
          },
          notEmpty: {
            msg: 'Password is required'
          },
          len: {
            args: [5, 100],
            msg: 'Password minimum 5 characters'
          }
        }
      },
    role: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : { 
          msg : "Role required!"
        },
        notNull : { 
          msg : "Role required!"
        }
      }
  }}, {
    hooks: {
      beforeCreate (instance, option) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash
      }
    },

    sequelize,
    modelName: 'User',
  });
  return User;

};