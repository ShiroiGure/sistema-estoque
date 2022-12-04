const Sequelize = require("sequelize");
const connection = require("../database/database");

const UsersModel = connection.define('Users', {

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
  
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false
  },

  permission: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = UsersModel