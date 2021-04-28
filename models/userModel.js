const { DataTypes } = require("sequelize");
const { sequelize } = require("./databaseConnection/dbConnection");

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Email already exists",
    },
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
