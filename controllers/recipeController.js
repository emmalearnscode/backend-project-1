const crud = require("../models/crud/crudFunctions");

const fetchIngredients = async (req, res) => {
  const page = req.query.page;
  const filter = req.query.filter;
  const ingredients = await crud.fetchIngredients(page, filter);

  res.json({ ingredients: ingredients });
};

const addRecipe = async (req, res) => {
  const recipe = req.body.recipe;
  const response = await crud.addRecipe(recipe);
  res.json(response);
};

module.exports = {
  fetchIngredients,
  addRecipe,
};
