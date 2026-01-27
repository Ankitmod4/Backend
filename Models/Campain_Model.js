const { DataTypes } = require("sequelize");
const sequelize = require("../Database/Database");

const Campaign = sequelize.define("Campaign", {
  campaignName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  influencerType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  platformType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  budget: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // ✅ EMAIL FIELD ADDED
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  details: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Campaign;
