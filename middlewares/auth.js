const { Unauthorized } = require("../errors");
const User = require("../models/crud/userCrud");

const user = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Unauthorized();
  }
  const token = authorization.replace("Bearer ", "");

  const user = User.validateToken(token);

  req.user = user;
  next();
};

module.exports = { user };
