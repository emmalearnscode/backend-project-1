const { DataTypes } = require("sequelize");
const { sequelize } = require("./databaseConnection/dbConnection");

const Ingredient = sequelize.define("Ingredient", {
  item: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Ingredient;
