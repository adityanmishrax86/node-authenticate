const express = require('express')
const bodyParser = require('body-parser');
const passport = require("passport")
const flash = require("connect-flash");
const session = require("express-session")
const helmet = require("helmet");
require("dotenv").config();
require("./config/passport-setup");
const router = require("./routes");
const userRouter = require("./routes/users");
const recipeRouter = require("./routes/recipes");
const mongoose = require("mongoose");

const app = express()

app.set("view engine","html");
app.engine("html", require("ejs").renderFile)

app.use(helmet())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    cookie:{maxAge:60000000},
    secret:"Dynamite",
    resave : false,
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session());

app.use(flash())

app.use("/", router)
app.use("/users",userRouter);
app.use("/recipes",recipeRouter);

const start = async () => {
    await mongoose.connect('mongodb://localhost:27017',{
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    app.listen(4000, () => {
        console.log("Server running on 4000!")
    })

}

start();
