const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const recipeController = require("../controllers/recipeController.js");

//Skapar en ny användare
router.post("/register", userController.createNewUser);

//Loggar in och får tillbaka en JWT
router.post("/auth", userController.loginUser);

//Listar ingredienser paginerat.
//Denna endpoint ska även ha en sökfunktion med hjälp av en query-param “filter”.
router.get("/ingredients", recipeController.fetchIngredients);

//Skapar ett nytt recept. Endast tillgänglig för ägaren.
//router.post("/recipes");

//Hämtar recept paginerat.
//Denna endpoint ska även ha en sökfunktion med hjälp av en query-param “filter”
//router.get("/recipes");

//Uppdaterar ett recept Endast tillgänglig för ägaren.
//router.patch("/recipes/:id");

//Tar bort ett recept. Endast tillgänglig för ägaren.
//router.delete("/recipes/:id");

//Hämtar ett specifikt recept
//router.get("/recipes/:id");

module.exports = router;
