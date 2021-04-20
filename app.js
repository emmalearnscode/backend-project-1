require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const routes = require("./routes/routes.js");
const LogRequest = require("./middlewares/logRequest.js");
const HandleError = require("./middlewares/errors.js");

app.use(express.json());

app.use(LogRequest);
app.use(routes);
app.use(HandleError);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
