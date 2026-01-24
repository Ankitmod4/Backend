const { DataTypes } = require("sequelize");
const sequelize = require("../Database/Database");

const Blog = sequelize.define("Blog", {
  title: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Blog;
