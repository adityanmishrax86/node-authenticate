const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    recipe:String,
    recipeDescription:String,
    img: {
        type: [String],
        default: []
    },
    price:Number,
    type:String,
    rating:Number,
    isAvailable: {
        type: Boolean,
        required: true
    }
})

const Recipe = new mongoose.model("Recipe",RecipeSchema)

module.exports = {
    Recipe
}