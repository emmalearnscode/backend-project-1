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
//Tar query page eg page=5 (får alltid tillbaka 10 st resultat/page)
//Tar query filter som gör en findAll som matchar
router.get("/ingredients", recipeController.getAllIngredients);

//Sök efter en specifikt ingredient med namn eller id
//Tar query item som kan vara antingen namnet eller id på varan eg ingredients/ingredient?item=Onions
router.get("/ingredients/ingredient", recipeController.getOneIngredient);

//Skapar ett nytt recept. Endast tillgänglig för ägaren.
//Skicka med {title, instructions} i bodyn och Authorization header containing token
router.post("/recipes", Auth.user, recipeController.addRecipe);

//Lägga till ingredienser på ett recept. Endast tillgänglig för ägaren.
//Skicka med amount i body.
router.post(
  "/recipes/:recipeId/ingredients/:ingredientsId",
  Auth.user,
  recipeController.addIngredientsToRecipe
);

//Hämtar recept paginerat.
//Denna endpoint ska även ha en sökfunktion med hjälp av en query-param “filter”
//router.get("/recipes");

//Uppdaterar ett recept Endast tillgänglig för ägaren.
//router.patch("/recipes/:id");

//Uppdaterar ingredienser till ett recept. Endast tillgänglig för ägaren.
//router.patch("/recipes/:recipeId/ingredients/:ingredientsId")

//Delete ingredienser till ett recept. Endast tillgänglig för ägaren.
//router.delete("/recipes/:recipeId/ingredients/:ingredientsId")

//Tar bort ett recept.
//Tar bort även alla tillhörande ingredienser från pseudotabellen samtidigt.
//Endast tillgänglig för ägaren.
router.delete("/recipes/:id", Auth.user, recipeController.deleteRecipe);

//Hämtar ett specifikt recept
router.get("/recipes/:id", recipeController.getOneRecipe);

//Hämtar bara ens egna recept. Endast tillgänglig för ägaren.
//router.get("/user/:id/recipes")

module.exports = router;
