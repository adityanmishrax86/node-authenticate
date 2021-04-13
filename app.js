const express = require('express')
const bodyParser = require('body-parser');
const passport = require("passport")
const flash = require("connect-flash");
const session = require("express-session")
require("dotenv").config();
require("./config/passport-setup");
const router = require("./routes");

const app = express()

app.set("view engine","html");
app.engine("html", require("ejs").renderFile)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    cookie:{maxAge:60000},
    secret:"Dynamite",
    resave : false,
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session());


app.use(flash())

app.use("/", router)


app.listen(4000, () => {
    console.log("Server running on 4000!")
})