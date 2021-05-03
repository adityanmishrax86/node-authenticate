const recipeRouter = require('express').Router();

recipeRouter.get("/", require("../controllers/Recipe").getAllRecipes);

module.exports =  recipeRouter;