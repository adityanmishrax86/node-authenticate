const {Recipe} = require('../models/Recipe');

module.exports = {
    async getAllRecipes(req, res) {
        let recipes;
        try {
            recipes = await Recipe.find({});
        }catch {
           return res.status(400).send("No Recipes Found");
        }
        return res.status(201).send(recipes)
    }
}