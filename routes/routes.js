const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const recipeController = require("../controllers/recipeController.js");
const Auth = require("../middlewares/auth");

//Skapar en ny användare. Skicka med {email, password} i body.
router.post("/register", userController.createNewUser);

//Loggar in och får tillbaka en JWT. Skicka med {email, password} i body.
router.post("/auth", userController.loginUser);

//Listar ingredienser paginerat.
//Denna endpoint ska även ha en sökfunktion med hjälp av en query-param “filter”.
//Tar params page och filter (får alltid tillbaka 10 st resultat/page)
router.get("/ingredients", recipeController.fetchIngredients);

//Skapar ett nytt recept. Endast tillgänglig för ägaren. Skicka med {title, instructions} i bodyn och Authorization header containing token
router.post("/recipes", Auth.user, recipeController.addRecipe);

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
