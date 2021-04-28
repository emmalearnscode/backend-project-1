const User = require("../userModel");

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

module.exports = {
  createNewUser,
  loginUser,
  validateToken,
};
