const { DataTypes } = require("sequelize");
const { sequelize } = require("./databaseConnection/dbConnection");

const Recipe = require("./recipeModel");
const Ingredient = require("./ingredientModel");

const RecipeIngredientAmount = sequelize.define("RecipeIngredientAmount", {
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Recipe.belongsToMany(Ingredient, { through: RecipeIngredientAmount });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredientAmount });
