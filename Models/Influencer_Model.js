const { DataTypes } = require('sequelize');
const sequelize = require('../Database/Database');

const Influencer = sequelize.define('Influencer', {
  ProfilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
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
  },

  Category: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  Location: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  Followers: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  Price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  AccountLinks: {
    type: DataTypes.JSON,
    allowNull: false,
  }
});

module.exports = Influencer;
