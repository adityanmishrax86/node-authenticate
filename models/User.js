const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        index: {
            unique:true
        }
    },
    password: {
        type:String,
    },
    firstname: {
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    }
})

const User = mongoose.model('User',userSchema);

module.exports = {
    User
}