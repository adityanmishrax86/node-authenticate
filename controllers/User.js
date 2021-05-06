const { User } = require("../models/User");
const passport = require('passport');
const bcrypt = require('bcrypt');

const userOps = {
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
        const { firstname, lastname, username, password } = req.body;
        let user;
        try {
            //first search if user already exists or not
            user = await User.find({
                username
            })
            if(user.length !== 0)
                return res.status(403).send("User Exists Already")

            //hash the password
            const hashedPassword = await bcrypt.hash(password, 10);


            user = await User.create({
                firstname,
                lastname,
                email:username,
                password:hashedPassword
            })

            await user.save();

        } catch (e) {
            console.log(e)
            return res.status(403).send("Error in User")
        }
        return res.status(201).send(user);
    },
    async updateUser(req, res) {
        const { ...details } = req.body;
        const { id } = req.params;
        let user;
        try {
            user = await User.findByIdAndUpdate(id,{
                ...details
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
    }
}

const authOps = {
    login(req, res, next) {
        const { username, password }  = req.body
        // Validate request
        console.log(username, 1)
        if(!username || !password) {
            req.flash('error', 'All fields are required')
            console.log(2)
            return res.redirect('/')
        }
        passport.authenticate('local', (err, user) => {
            if(err) {
                console.log(3)
                return next(err)
            }
            if(!user) {
                console.log(4)
                return res.redirect('/')
            }
            req.logIn(user, (err) => {
                if(err) {
                    req.flash('error', "info.message" )
                    console.log(4)
                    return next(err)
                }
                console.log(5)
                return res.redirect("/view")
            })
        })(req, res, next)
    }
}
module.exports = {
    userOps,
    authOps
}