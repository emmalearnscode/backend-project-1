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

async function createNewUser(newUser) {
  //Check that user email doesn't already exist
  const userExists = await User.findAll({ where: { email: newUser.email } });
  if (userExists.length > 0) {
    return { message: `User already exists` };
  }

  //Create new user
  const digest = bcrypt.hashSync(newUser.password, 10);
  const user = await User.create({
    email: newUser.email,
    passwordHash: digest,
  });
  return { message: `New user with ID ${user.id} created` }; //Hur hanterar jag detta om det misslyckas? Ska jag använda try/catch och returnera res.status i catch?
}

async function loginUser(user) {
  const currentUser = await User.findOne({ where: { email: user.email } });
  if (!currentUser) {
    return { message: "No user exists with the current login details" };
  }
  const passwordMatch = bcrypt.compareSync(
    user.password,
    currentUser.passwordHash
  );
  if (!passwordMatch) {
    return { message: "Email or password do not match" };
  }
  const token = jwt.sign(currentUser.id, process.env.SECRET_KEY); // When I try to add expiresIn it doesn't work????
  if (!token) {
    return { message: "Oops! Something went wrong." };
  }

  return {
    currentUser: { email: currentUser.email, id: currentUser.id },
    token: token,
    message: "Successfully logged in",
  };
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
        item: { [Op.substring]: filter },
      },
      offset: pageOffset,
      limit: pageLimit,
    });
    return ingredients;
  }
}

module.exports = {
  createNewUser,
  loginUser,
  fetchIngredients,
};
