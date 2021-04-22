const crud = require("../models/crud/crudFunctions");
const { InvalidBody } = require("../errors");

const fetchIngredients = async (req, res, next) => {
  try {
    const page = req.query.page;
    const filter = req.query.filter;
    const ingredients = await crud.fetchIngredients(page, filter);

    res.json({ ingredients: ingredients });
  } catch (error) {
    next(error);
  }
};

const addRecipe = async (req, res, next) => {
  try {
    const { title, instructions } = req.body;
    if (!title || !instructions) {
      throw new InvalidBody(["title", "instructions"]);
    }
    const UserId = +req.user.id;
    const response = await crud.addRecipe({ title, instructions, UserId });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchIngredients,
  addRecipe,
};
