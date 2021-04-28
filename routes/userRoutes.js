const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

//Skapar en ny användare. Skicka med {email, password} i body.
router.post("/register", userController.createNewUser);

//Loggar in och får tillbaka en JWT. Skicka med {email, password} i body.
router.post("/auth", userController.loginUser);

module.exports = router;
