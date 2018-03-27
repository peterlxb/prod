const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(
    new GithubStrategy({
        clientID: keys.githubClientID,
        clientSecret: keys.githubSecret,
        callbackURL: "http://127.0.0.1:5000/auth/github/callback"
    }, function (accessToken, refreshToken, profile, done) {
        console.log(accessToken);
        console.log(profile);
        
        User.findOne({githubId: profile.id})
            .then((existingUser) => {
                if(existingUser){
                    done(null,existingUser);
                } else {
                    new User({
                        githubId: profile.id
                    }).save().then(user => {
                        done(null,user);
                    });

                }
            })
        
    }));