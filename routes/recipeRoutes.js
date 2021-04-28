const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController.js");
const Auth = require("../middlewares/auth");

//Listar ingredienser paginerat.
//Denna endpoint ska även ha en sökfunktion med hjälp av en query-param “filter”.
//Tar query page eg page=5 (får alltid tillbaka 10 st resultat/page)
//Tar query filter som gör en findAll som matchar
router.get("/ingredients", recipeController.getAllIngredients);

//Sök efter en specifik ingredient med namn eller id
//Tar param som kan vara antingen namnet eller id på varan eg ingredients/Onions eller ingredients/11
router.get("/ingredients/:ingredient", recipeController.getOneIngredient);

//Skapar ett nytt recept. Endast tillgänglig för ägaren.
//Skicka med {title, instructions} i bodyn och Authorization header containing token
router.post("/recipes", Auth.user, recipeController.addRecipe);

//Hämtar recept paginerat.
//Denna endpoint ska även ha en sökfunktion med hjälp av en query-param “filter”
//Tar query page eg page=5 (får alltid tillbaka 10 st resultat/page)
//Tar query filter som gör en findAll som matchar
router.get("/recipes", recipeController.getAllRecipes);

//Uppdaterar ett recept Endast tillgänglig för ägaren.
//Tar emot title och/eller instructions i bodyn
router.patch("/recipes/:id", Auth.user, recipeController.updateRecipe);

//Tar bort ett recept.
//TIngredienserna som tillhör receptet har en egen route för att ta bort.
//Endast tillgänglig för ägaren.
router.delete("/recipes/:id", Auth.user, recipeController.deleteRecipe);

//Hämtar ett specifikt recept
router.get("/recipes/:id", recipeController.getOneRecipe);

//Lägga till ingredienser på ett recept. Endast tillgänglig för ägaren.
//Skicka med amount i body.
router.post(
  "/recipes/:recipeId/ingredients/:ingredientsId",
  Auth.user,
  recipeController.addIngredientsToRecipe
);

//Uppdaterar ingredienser till ett recept. Endast tillgänglig för ägaren.
//Tar emot amount i bodyn
router.patch(
  "/recipes/:recipeId/ingredients/:ingredientsId",
  Auth.user,
  recipeController.updateIngredientAmount
);

//Delete ingredienser till ett recept. Endast tillgänglig för ägaren.
router.delete(
  "/recipes/:recipeId/ingredients/:ingredientsId",
  Auth.user,
  recipeController.deleteIngredientFromRecipe
);

//Hämtar bara ens egna recept. Endast tillgänglig för ägaren.
router.get(
  "/user/:id/recipes",
  Auth.user,
  recipeController.getAllRecipesbyUser
);

module.exports = router;
