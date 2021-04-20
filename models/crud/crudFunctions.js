const {
  sequelize,
  User,
  Recipe,
  Ingredient,
  RecipeIngredientAmount,
} = require("../databaseConnection/dbConnection.js");

const bcrypt = require("bcryptjs");

async function createNewUser(newUser) {
  //Validate email and password
  if (!newUser.email || !newUser.password) {
    throw "No email or password";
    //Hur hantera man det så att client får ett meddelande?
  }

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

module.exports = {
  createNewUser,
};
