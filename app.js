require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const recipeRoutes = require("./routes/recipeRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const LogRequest = require("./middlewares/logRequest.js");
const HandleError = require("./middlewares/errors.js");

app.use(express.json());

app.use(LogRequest);
app.use(userRoutes);
app.use(recipeRoutes);
app.use(HandleError);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
