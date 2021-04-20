const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const recipeController = require("../controllers/recipeController.js");

//Skapar en ny användare
router.post("/register", (req, res) => {
  console.log("Hello");
});

//Loggar in och får tillbaka en JWT
//router.post("/auth");

//Listar ingredienser paginerat.
//Denna endpoint ska även ha en sökfunktion med hjälp av en query-param “filter”.
//router.get("/ingredients");

//Hämtar recept paginerat.
//Denna endpoint ska även ha en sökfunktion med hjälp av en query-param “filter”
//router.get("/recipes");

//Skapar ett nytt recept. Endast tillgänglig för ägaren.
//router.post("/recipes");

//Uppdaterar ett recept Endast tillgänglig för ägaren.
//router.patch("/recipes/:id");

//Tar bort ett recept. Endast tillgänglig för ägaren.
//router.delete("/recipes/:id");

//Hämtar ett specifikt recept
//router.get("/recipes/:id");

module.exports = router;
