const router = require("express").Router()
const { isAuthenticated } = require("../config/auth");
const passport = require('passport');

router.get("/", (req, res) => {
    res.render("index.html");
})

router.get("/auth/google",passport.authenticate('google', { scope: ["profile","email"], prompt: 'consent'}));

router.get("/auth/google/callback", passport.authenticate('google',{ failureRedirect: '/' }), (req,res) => {
    res.redirect("/view")
})

router.get("/view",isAuthenticated, (req, res)=> {
    res.render('view.ejs' ,{ user: req.user });
})

router.post("/login", passport.authenticate('local',{
    successRedirect:"/view",
    failureRedirect:"/",
    failureFlash:true
}))

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;


