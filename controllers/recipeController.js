const crud = require("../models/crud/crudFunctions");

const fetchIngredients = async (req, res) => {
  const page = req.query.page;
  const filter = req.query.filter;
  const ingredients = await crud.fetchIngredients(page, filter);

  res.json({ ingredients: ingredients });
};

module.exports = {
  fetchIngredients,
};
