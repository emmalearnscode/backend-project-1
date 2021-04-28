//const crud = require("../models/crud/crudFunctions");
const User = require("../models/crud/userCrud");
const { InvalidBody } = require("../errors");

const createNewUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Validate email and password - could add regex here to develop further
    if (!email || !password || password.length < 6) {
      throw new InvalidBody(["email", "password"]);
    }
    const response = await User.createNewUser({ email, password });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || password.length < 6) {
      throw new InvalidBody(["email", "password"]);
    }

    const response = await User.loginUser({ email, password });

    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { createNewUser, loginUser };
