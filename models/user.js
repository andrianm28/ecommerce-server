"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Cart, {
        through: 'Carts',
        as: 'carts',
        foreignKey: 'UserId',
        otherKey: 'ProdId'
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password is required",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "customer",
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(user, option) {
          user.role = 'customer'
        }
      }
    }
  );
  return User;
};
