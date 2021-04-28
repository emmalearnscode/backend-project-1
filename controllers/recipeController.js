//const crud = require("../models/crud/crudFunctions");
const RecipeCrud = require("../models/crud/recipeCrud");
const { InvalidBody, Unauthorized, NoResultsFound } = require("../errors");

const getAllIngredients = async (req, res, next) => {
  try {
    const page = req.query.page;
    const filter = req.query.filter;

    const ingredients = await RecipeCrud.getAllIngredients(page, filter);

    res.json({ ingredients: ingredients });
  } catch (error) {
    next(error);
  }
};

const getOneIngredient = async (req, res, next) => {
  try {
    const item = req.params.ingredient;
    const response = await RecipeCrud.getOneIngredient(item);
    if (!response) {
      throw new NoResultsFound();
    }
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const addRecipe = async (req, res, next) => {
  try {
    const { title, instructions } = req.body;
    console.log(title, instructions);
    if (!title || !instructions) {
      throw new InvalidBody(["title", "instructions"]);
    }
    const UserId = +req.user.id;
    const response = await RecipeCrud.addRecipe({
      title,
      instructions,
      UserId,
    });
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
    const recipe = await RecipeCrud.getOneRecipe(RecipeId);
    if (UserId != recipe.UserId) {
      throw new Unauthorized();
    }
    const ingredientExists = await RecipeCrud.getOneIngredient(IngredientId);
    if (!ingredientExists) {
      throw new NoResultsFound();
    }
    const response = await RecipeCrud.addIngredientsToRecipe({
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

    const recipeResponse = await RecipeCrud.getOneRecipe(id);
    if (!recipeResponse) {
      throw new NoResultsFound();
    }

    const ingredientsResponse = await RecipeCrud.getIngredientsForRecipe(
      recipeResponse.id
    );
    if (!ingredientsResponse) {
      throw new NoResultsFound();
    }

    res.json({ recipe: recipeResponse, ingredients: ingredientsResponse });
  } catch (error) {
    next(error);
  }
};

const getAllRecipes = async (req, res, next) => {
  try {
    const page = req.query.page;
    const filter = req.query.filter;
    const response = await RecipeCrud.getAllRecipes(page, filter);
    if (response.length === 0) {
      throw new NoResultsFound();
    }
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const UserId = req.user.id;
    const { title, instructions } = req.body;
    const fields = {};
    if (title) fields.title = title;
    if (instructions) fields.instructions = instructions;

    const recipe = await RecipeCrud.getOneRecipe(id);
    if (!recipe) {
      throw new NoResultsFound();
    }
    if (recipe.UserId !== UserId) {
      throw new Unauthorized();
    }

    const response = await RecipeCrud.updateRecipe(fields, id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const UserId = +req.user.id;
    const recipe = await RecipeCrud.getOneRecipe(id);
    console.log(recipe);
    if (!recipe) {
      throw new NoResultsFound();
    }
    if (UserId != recipe.UserId) {
      throw new Unauthorized();
    }

    const response = await RecipeCrud.deleteRecipe(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const deleteIngredientFromRecipe = async (req, res, next) => {
  try {
    const RecipeId = +req.params.recipeId;
    const IngredientId = +req.params.ingredientsId;
    const UserId = +req.user.id;
    const recipe = await RecipeCrud.getOneRecipe(RecipeId);
    console.log(recipe);
    if (!recipe) {
      throw new NoResultsFound();
    }
    if (UserId != recipe.UserId) {
      throw new Unauthorized();
    }

    const response = await RecipeCrud.deleteIngredientsFromRecipe(
      RecipeId,
      IngredientId
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const updateIngredientAmount = async (req, res, next) => {
  try {
    const UserId = +req.user.id;
    const RecipeId = +req.params.recipeId;
    const IngredientId = +req.params.ingredientsId;
    const { amount } = req.body;
    const recipe = await RecipeCrud.getOneRecipe(RecipeId);
    if (!recipe) {
      throw new NoResultsFound();
    }
    if (UserId != recipe.UserId) {
      throw new Unauthorized();
    }
    const ingredientExists = await RecipeCrud.getOneIngredient(IngredientId);
    if (!ingredientExists) {
      throw new NoResultsFound();
    }

    const response = await RecipeCrud.updateIngredientAmount(
      RecipeId,
      IngredientId,
      amount
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getAllRecipesbyUser = async (req, res, next) => {
  try {
    const UserId = +req.user.id;

    if (UserId !== +req.params.id) {
      throw new Unauthorized();
    }

    const response = await RecipeCrud.getAllRecipesbyUser(UserId);
    console.log(response);
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
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
  deleteIngredientFromRecipe,
  updateIngredientAmount,
  getAllRecipesbyUser,
};
