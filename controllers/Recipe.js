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
    },
    async getRecipeById(req, res) {
        let recipe, {id} = req.params;
        try {
            recipe = await Recipe.findById(id);
        }catch {
            return res.status(403).send("No Recipe Found");
        }
        return res.status(201).send(recipe);
    },
    async addRecipe(req, res) {
        let { recipe, recipeDescription, price, isAvailable, rating, type } = req.body;
        let newRecipe;
        try {
            newRecipe = await Recipe.create({
                recipe,
                recipeDescription,
                price,
                isAvailable,
                rating,
                type
            })
            await newRecipe.save();
        } catch {
            return res.status(403).send("Unable to create Recipe");
        }
        return res.status(201).send(newRecipe);
    },
    async deleteRecipe(req, res) {
        let recipe, { id } = req.params;
        try {
            recipe = Recipe.findByIdAndDelete(id)
        } catch {
            return res.status(403).send("Unable to create Recipe");
        }
        return res.status(201).send(recipe);
    },
    async updateRecipe(req, res) {
        let updatedRecipe, { id } = req.params;
        let { ...details } = req.body;
        try {
            updatedRecipe = await Recipe.findByIdAndUpdate(id, {
                ...details
            },{
                useFindAndModify:false,
                new:true
            })
        }catch (err) {
            return res.status(403).send(err)
        }
        return res.status(203).send(updatedRecipe);
    },
}