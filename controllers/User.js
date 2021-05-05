const { User } = require("../models/User");
const passport = require('passport');

module.exports = {
    async getAllUsers(req, res) {
        let users;
        try {
            users = await User.find({});
        } catch(err) {
            return res.status(400).send("No user found")
        }
        return res.status(201).send(users);

    },
    async getUserById(req, res) {
        let user;
        try {
            user = await User.findById(req.params.id)
        } catch (err) {
            return res.status(400).send("No User")
        }
        return res.status(200).send(user);

    },
    async addUser(req, res){
        const { firstname, lastname, email, password } = req.body;
        let user;
        try {
            user = await User.create({
                firstname,
                lastname,
                email,
                password
            })
            await user.save();
        } catch (e) {
            return res.status(403).send("Error in User")
        }
        return res.status(201).send(user);


    },
    async updateUser(req, res) {
        const { firstname, lastname, email, password } = req.body;
        const { id } = req.params;
        let user;
        try {
            user = await User.findByIdAndUpdate(id,{
                firstname,
                lastname,
                email,
                password
            }, {
                useFindAndModify:false,
                new:true
            });
        }catch (err) {
            return res.status(403).send("Some Error Occured")
        }
        return res.status(203).send(user);

    },
    async deleteUser(req,res) {
        const {id} = req.params;
        let user;
        try {
            user = await User.findByIdAndDelete(id);
        } catch (e) {
            return res.status(403).send("SOme Error occured")
        }
        return res.status(203).send([]);
    },
    async login(req, res, next) {
        const { email, password } = req.body;
        if(!email || !password)
            return res.redirect("/login");

        passport.authenticate('local', {
                successRedirect:"/view",
                failureRedirect:"/",
            },(err, user) => {
            if(err)
                return next(err);

            if(!user)
                return next(err);
        },
            )
    }
}