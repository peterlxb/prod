const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('./config/keys.js');
const app = express();
const PORT = process.env.PORT || 5000;

//console.log(keys.googleClientID);
console.log(keys.googleSecret);

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleSecret,
    callbackURL: "/auth/google/callback"
},function(accessToken,refreshToken,profile,done){
  console.log(accessToken);
  console.log(refreshToken);
}));

app.get('/auth/google/',
  passport.authenticate('google', { scope: ['profile','email'] }),
);

app.get('/auth/google/callback', passport.authenticate('google'));

app.listen(PORT,() => console.log('Example app listening on port 5000!'))
