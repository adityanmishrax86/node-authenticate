const userRouter = require("express").Router()
const passport = require('passport');
const {isAuthenticated} = require("../config/auth");

// Auth
userRouter.get("/auth/google",passport.authenticate('google', { scope: ["profile","email"], prompt: 'consent'}));

userRouter.get("/auth/google/callback", passport.authenticate('google',{ failureRedirect: '/' }), (req,res) => {
    res.redirect("/user/view")
})

userRouter.post("/login", require("../controllers/User").login)

userRouter.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

userRouter.get("/view", isAuthenticated, (req, res) => {
    res.render('view.ejs', {
        user: req.user
    })
})

// CRUD
userRouter.get("/users", require("../controllers/User").getAllUsers);
userRouter.get("/users/:id", require("../controllers/User").getUserById)
userRouter.post("/users/add",require("../controllers/User").addUser);
userRouter.delete("/users/:id",require("../controllers/User").deleteUser)
userRouter.put("/users/update/:id",require("../controllers/User").updateUser)

module.exports = userRouter;