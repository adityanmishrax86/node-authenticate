const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
const LocalStrategy = require("passport-local")
const bcrypt = require('bcrypt');

const { User } = require("../models/User");

passport.use(new LocalStrategy(async (username, password, done) => {
    let user;
    try {
        user = await User.findOne({
            email: username,
        })
        if(!user) {
            return done(null, false);
        }

        bcrypt.compare(password, user.password)
            .then(match => {
            if(match) {
                return done(null, user);
            }
            return done(null, false);
            })
            .catch(err => done(err, false))

    } catch(err) {
        console.log("Error found",err);
    }

}))

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:4000/user/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    const { given_name, family_name, email } = profile._json;
    let user;
    try{
        user = await User.findOne({
            email:email
        })
        if(user)
            return done(null, profile);
        else{
            user = await User.create({
                firstname: given_name,
                lastname: family_name,
                email
            })
            await user.save();
            return done(null, profile);
        }
    } catch (e){
        console.log("User exists already", e.msg)
    }

}))


passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
        done(err, user)
    })
});

passport.serializeUser(function(user, done) {
    done(null, user._id);
});