const userRouter = require("express").Router()
const passport = require('passport');
const { getAllUsers,getUserById,addUser,deleteUser,updateUser } = require("../controllers/User").userOps

// Auth
userRouter.get("/auth/google",passport.authenticate('google', { scope: ["profile","email"], prompt: 'consent'}));

userRouter.get("/auth/google/callback", passport.authenticate('google',{ failureRedirect: '/' }), (req,res) => {
    res.redirect("/view")
})


// CRUD
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById)
userRouter.post("/add",addUser);
userRouter.delete("/delete/:id",deleteUser)
userRouter.put("/update/:id",updateUser)

module.exports = userRouter;