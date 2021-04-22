const { RecipeWebsiteError } = require("../errors");
const { BaseError } = require("sequelize");

const HandleError = (error, req, res, next) => {
  if (error instanceof RecipeWebsiteError) {
    res.status(error.statusCode).json({ error: error.message });
  } else if (error instanceof BaseError) {
    res.status(400).json({
      error: error.message,
    });
  } else {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = HandleError;
