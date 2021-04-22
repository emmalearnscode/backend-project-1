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

async function fetchIngredients(page = 1, filter) {
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

async function addRecipe(recipe) {
  //console.log(recipe);
  const newRecipe = await Recipe.create({
    title: recipe.title,
    instructions: recipe.instructions,
    UserId: recipe.UserId,
  });
  // recipe.ingredients.forEach(async (ingredient) => {
  //   //console.log(ingredient);
  //   const ingredientInfo = await Ingredient.findOne({
  //     where: { item: ingredient.item },
  //   });
  //   const ingredientToAdd = {
  //     RecipeId: newRecipe.id,
  //     IngredientId: ingredientInfo.id,
  //     amount: ingredient.amount,
  //   };

  //   console.log(ingredientToAdd);

  //   const addedIngredient = await RecipeIngredientAmount.create(
  //     ingredientToAdd
  //   );
  //   console.log(addedIngredient);
  // });

  //console.log(newRecipe);
  // RecipeIngredientAmount.create({
  //   RecipeId: newRecipe.id,
  //   IngredientId: ingredientInfo.id,
  //   amount: ingredient.amount,
  // });
  // });
  return { message: "Successfully added recipe" };
}

module.exports = {
  createNewUser,
  loginUser,
  validateToken,
  fetchIngredients,
  addRecipe,
};
