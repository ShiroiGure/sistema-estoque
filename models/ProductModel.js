const Sequelize = require("sequelize");
const connection = require("../database/database");
const CategoryModel = require("./CategoryModel");

const ProductModel = connection.define("products", {

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  quantidade: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  image: {
    type: Sequelize.STRING,
    allowNull: false
  },

  price: {
    type: Sequelize.FLOAT,
    default: 100.0,
    allowNull: false
  }
});

CategoryModel.hasMany(ProductModel, {as: "products"});
ProductModel.belongsTo(CategoryModel, {
  foreignKey: "categoryId",
  as: "categories",
});

ProductModel.sync({force: false});

module.exports = ProductModel;