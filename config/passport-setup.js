const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
const LocalStrategy = require("passport-local")
const { User } = require("../models/User");

passport.use(new LocalStrategy(async (username, password, done) => {
    let user;
    try {
        user = await User.findOne({
            email: username,
        })
        if(user){
            return done(null, user)
        }else{
            return done(null, false);
        }
    } catch {
        console.log("Error found");
    }

}))

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:4000/auth/google/callback"
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


passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.serializeUser(function(user, done) {
    done(null, user);
});