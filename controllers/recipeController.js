const crud = require("../models/crud/crudFunctions");
const { InvalidBody, Unauthorized } = require("../errors");

const fetchIngredients = async (req, res, next) => {
  try {
    const page = req.query.page;
    const filter = req.query.filter;
    const search = req.query.search;
    const ingredients = await crud.fetchIngredients(page, filter, search);

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

const addIngredientsToRecipe = async (req, res, next) => {
  try {
    const UserId = +req.user.id;
    const RecipeId = +req.params.recipeId;
    const IngredientId = +req.params.ingredientsId;
    const { amount } = req.body;
    const recipe = await crud.getOneRecipe(RecipeId);
    if (UserId != recipe.UserId) {
      throw new Unauthorized();
    }
    const response = await crud.addIngredientsToRecipe({
      RecipeId,
      IngredientId,
      amount,
    });
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchIngredients,
  addRecipe,
  addIngredientsToRecipe,
};
