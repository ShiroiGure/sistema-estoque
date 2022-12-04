const Sequelize = require("sequelize");
const connection = require("../database/database");

const CategoryModel = connection.define("categories", {

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

CategoryModel.sync({force: false});

module.exports = CategoryModel;