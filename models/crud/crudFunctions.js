const {
  sequelize,
  Op,
  User,
  Recipe,
  Ingredient,
  RecipeIngredientAmount,
} = require("../databaseConnection/dbConnection.js");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  InvalidCredentials,
  TokenExpired,
  Unauthorized,
  NoResultsFound,
} = require("../../errors");

async function createNewUser(newUser) {
  const digest = bcrypt.hashSync(newUser.password, 10);
  const user = await User.create({
    email: newUser.email,
    passwordHash: digest,
  });
  return { message: `New user with ID ${user.id} created` }; //Hur hanterar jag detta om det misslyckas? Ska jag använda try/catch och returnera res.status i catch?
}

async function loginUser(user) {
  const currentUser = await User.findOne({ where: { email: user.email } });
  console.log(currentUser);
  if (!currentUser) {
    throw new InvalidCredentials();
  }
  const passwordMatch = bcrypt.compareSync(
    user.password,
    currentUser.passwordHash
  );
  if (!passwordMatch) {
    throw new InvalidCredentials();
  }
  const payload = { id: currentUser.id, email: currentUser.email };
  const token = jwt.sign(payload, process.env.SECRET_KEY); // When I try to add expiresIn it doesn't work????

  return {
    currentUser: { email: currentUser.email, id: currentUser.id },
    token: token,
    message: "Successfully logged in",
  };
}

function validateToken(token) {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TokenExpired();
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Unauthorized();
    } else {
      throw error;
    }
  }
}

async function getAllIngredients(page = 1, filter) {
  const pageLimit = 10;
  const pageOffset = page * pageLimit - pageLimit;
  //Is there a better way of doing this than running two different db requests when filter is undefined?
  if (!filter) {
    const ingredients = await Ingredient.findAll({
      offset: pageOffset,
      limit: pageLimit,
    });
    return ingredients;
  } else {
    const ingredients = await Ingredient.findAll({
      where: {
        item: { [Op.substring]: filter }, // Make this case insensitive
      },
      offset: pageOffset,
      limit: pageLimit,
    });
    return ingredients;
  }
}

async function getOneIngredient(searchParam) {
  const ingredient = await Ingredient.findOne({
    where: {
      [Op.or]: [{ item: searchParam }, { id: searchParam }],
    },
  });

  return ingredient;
}

async function addRecipe(recipe) {
  const newRecipe = await Recipe.create({
    title: recipe.title,
    instructions: recipe.instructions,
    UserId: recipe.UserId,
  });

  return { message: "Successfully added recipe" };
}

async function getOneRecipe(id) {
  const recipe = await Recipe.findOne({ where: { id } });
  console.log(recipe);
  return recipe;
}

async function getAllRecipes(page = 1, filter) {
  const pageLimit = 10;
  const pageOffset = page * pageLimit - pageLimit;

  if (!filter) {
    const allRecipes = Recipe.findAll({
      offset: pageOffset,
      limit: pageLimit,
    });
    return allRecipes;
  } else {
    const allRecipes = await Recipe.findAll({
      where: {
        title: { [Op.substring]: filter }, // Make this case insensitive
      },
      offset: pageOffset,
      limit: pageLimit,
    });
    return allRecipes;
  }
}

async function getAllRecipesbyUser(UserId) {
  const recipes = await Recipe.findAll({ where: { UserId } });

  return { message: `All recipes for user ${UserId}`, recipes: recipes };
}

async function getIngredientsForRecipe(id) {
  const ingredients = await RecipeIngredientAmount.findAll({
    where: { RecipeId: id },
  });

  return ingredients;
}

async function addIngredientsToRecipe(ingredient) {
  const newIngredient = await RecipeIngredientAmount.create(ingredient);
  return { message: "Ingredient added successfully" };
}

async function updateRecipe(fields, id) {
  const updatedRecipe = Recipe.update(fields, { where: { id } });
  return { message: "Recipe updated successfully" };
}

async function deleteRecipe(id) {
  await Recipe.destroy({ where: { id } });

  return { message: "Recipe deleted successfully" };
}

async function deleteIngredientsFromRecipe(RecipeId, IngredientId) {
  const response = await RecipeIngredientAmount.destroy({
    where: { [Op.and]: [{ RecipeId }, { IngredientId }] },
  });
  if (!response) {
    throw new NoResultsFound();
  }
  return { message: "Ingredient deleted from recipe successfully" };
}

async function updateIngredientAmount(RecipeId, IngredientId, amount) {
  const response = await RecipeIngredientAmount.update(
    { amount },
    {
      where: { [Op.and]: [{ RecipeId }, { IngredientId }] },
    }
  );
  console.log(response);
  if (response[0] === 0) {
    throw new NoResultsFound();
  }
  return { message: "Ingredient in recipe updated successfully" };
}

module.exports = {
  createNewUser,
  loginUser,
  validateToken,
  getAllIngredients,
  getOneIngredient,
  addRecipe,
  addIngredientsToRecipe,
  getOneRecipe,
  getAllRecipes,
  getAllRecipesbyUser,
  getIngredientsForRecipe,
  updateRecipe,
  deleteRecipe,
  deleteIngredientsFromRecipe,
  updateIngredientAmount,
};
