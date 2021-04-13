const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
const LocalStrategy = require("passport-local")

passport.use(new LocalStrategy((username, password, done) => {
    if (username == "azax" && password == "azax1234"){
        return done(null, "user")
    }else{
        return done(null, false, { message:"Invalid Credentials"})
    }
}))

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:4000/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}))


passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.serializeUser(function(user, done) {
    done(null, user);
});