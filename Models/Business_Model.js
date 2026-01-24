const { DataTypes } = require('sequelize');
const sequelize = require('../Database/Database');

const Business = sequelize.define('Business', {
  PhoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  
  BusinessName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
    },
}); 

module.exports = Business;