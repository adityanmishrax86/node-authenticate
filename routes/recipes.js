const recipeRouter = require('express').Router();

recipeRouter.get("/", require("../controllers/Recipe").getAllRecipes);
recipeRouter.get("/:id", require("../controllers/Recipe").getRecipeById);
recipeRouter.post("/add", require("../controllers/Recipe").addRecipe);
recipeRouter.delete("/delete/:id", require("../controllers/Recipe").deleteRecipe);
recipeRouter.put("/update/:id", require("../controllers/Recipe").updateRecipe);

module.exports =  recipeRouter;