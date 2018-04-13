const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
//const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

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
    new GitHubStrategy({
        clientID: keys.githubClientID,
        clientSecret: keys.githubSecret,
        callbackURL: "http://127.0.0.1:5000/auth/github/callback",
        proxy:true
    }, (accessToken, refreshToken, profile, done) => {
        console.log("accessToken: ",accessToken);
        console.log("profile: ",profile);

        User.findOne({githubId: profile.id}).then(existingUser => {
          if (existingUser) {
            //
            done(null, existingUser);
          } else {
            //
             new User({ githubId: profile.id })
              .save()
              .then(user => done(null,user));
          }
        });

        }
      )
  );
