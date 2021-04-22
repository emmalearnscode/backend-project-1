class RecipeWebsiteError extends Error {}

class InvalidBody extends RecipeWebsiteError {
  constructor(fieldsArr) {
    super();
    this.fieldsArr = fieldsArr;
    this.message = `Invalid body, the following fields are required: ${this.fieldsArr.join(
      ", "
    )}`;
    this.statusCode = 400;
  }
}

class InvalidCredentials extends RecipeWebsiteError {
  constructor() {
    super();
    this.message = `Invalid email or password`;
    this.statusCode = 403;
  }
}

class Unauthorized extends RecipeWebsiteError {
  constructor() {
    super();
    this.message = `Unauthorized`;
    this.statusCode = 401;
  }
}

class TokenExpired extends RecipeWebsiteError {
  constructor() {
    super();
    this.message = `Token expired, please log in again`;
    this.statusCode = 401;
  }
}

module.exports = {
  RecipeWebsiteError,
  InvalidBody,
  InvalidCredentials,
  Unauthorized,
  TokenExpired,
};
