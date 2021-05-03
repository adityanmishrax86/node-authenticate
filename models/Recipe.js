const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    recipe:String,
    recipeDescription:String,
    img:[String],
    price:Number,
    type:String,
    rating:Number
})

const Recipe = new mongoose.model("Recipe",RecipeSchema)

module.exports = {
    Recipe
}