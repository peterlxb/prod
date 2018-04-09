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
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(profile);

        const existingUser = await User.findOne({githubId: profile.id});

        if(existingUser){

          return done(null,existingUser);

        }

        const user = await new User({ githubId: profile.id }).save();
        done(null,user);

        }
      )

  );
