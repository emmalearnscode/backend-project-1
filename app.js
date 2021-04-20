require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const sequelize = require("./models/databaseConnection/dbConnection.js");

const routes = require("./routes/routes.js");

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
