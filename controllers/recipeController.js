const crud = require("../models/crud/crudFunctions");
const {
  InvalidBody,
  Unauthorized,
  InvalidQuery,
  NoResultsFound,
} = require("../errors");

const getAllIngredients = async (req, res, next) => {
  try {
    const page = req.query.page;
    const filter = req.query.filter;

    const ingredients = await crud.getAllIngredients(page, filter);

    res.json({ ingredients: ingredients });
  } catch (error) {
    next(error);
  }
};

const getOneIngredient = async (req, res, next) => {
  try {
    const { item } = req.query;
    if (!item) {
      throw new InvalidQuery();
    }

    const response = await crud.getOneIngredient(item);
    if (!response) {
      res.json({ message: "Item doesn't exist" });
    }
    res.json(response);
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
    const ingredientExists = await crud.getOneIngredient(IngredientId);
    if (!ingredientExists) {
      throw new NoResultsFound();
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

const getOneRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipeResponse = await crud.getOneRecipe(id);
    if (!recipeResponse) {
      throw new NoResultsFound();
    }
    const ingredientsResponse = await crud.getIngredientsForRecipe(
      recipeResponse.id
    );
    res.json({ recipe: recipeResponse, ingredients: ingredientsResponse });
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const UserId = +req.user.id;
    const recipe = await crud.getOneRecipe(id);
    console.log(recipe);
    if (!recipe) {
      throw new NoResultsFound();
    }
    if (UserId != recipe.UserId) {
      throw new Unauthorized();
    }

    const response = await crud.deleteRecipe(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllIngredients,
  getOneIngredient,
  addRecipe,
  addIngredientsToRecipe,
  getOneRecipe,
  deleteRecipe,
};
