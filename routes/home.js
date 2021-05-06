const homeRouter = require("express").Router()

const {isAuthenticated} = require("../config/auth");
const { login } = require("../controllers/User").authOps


homeRouter.get("/", (req, res) => {
    res.render("index.html");
})

homeRouter.post("/login", login)

homeRouter.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

homeRouter.get("/register",(req, res) => {
    res.render("register.ejs")
})


homeRouter.get("/view", isAuthenticated, (req, res) => {
    res.render("view.ejs", {
        user:req.user
    })
})

module.exports = homeRouter;