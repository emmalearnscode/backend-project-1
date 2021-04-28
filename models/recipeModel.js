const { DataTypes } = require("sequelize");
const { sequelize } = require("./databaseConnection/dbConnection");
const User = require("./userModel");

const Recipe = sequelize.define("Recipe", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Recipe.belongsTo(User);

module.exports = Recipe;
