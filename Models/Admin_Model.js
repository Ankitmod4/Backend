const { DataTypes } = require('sequelize');
const sequelize = require('../Database/Database');

const Admin = sequelize.define('Admin', {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Admin;
