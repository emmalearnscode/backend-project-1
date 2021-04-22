const { Unauthorized } = require("../errors");
const crud = require("../models/crud/crudFunctions");

const user = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Unauthorized();
  }
  const token = authorization.replace("Bearer ", "");

  const user = crud.validateToken(token);

  req.user = user;
  next();
};

module.exports = { user };
