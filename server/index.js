const express = require('express');
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const keys = require('./config/keys');
const app = express();
const PORT = process.env.PORT || 5000;

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "http://localhost:5000/auth/google/callback"
},(accessToken) => {
  console.log(accessToken)
}));

app.get('/auth/google/',
  passport.authenticate('google', { scope: ['profile','email'] }),
);

app.get('/auth/google/callback',
  passport.authenticate('google'),
);

app.listen(PORT,() => console.log('Example app listening on port 5000!'))
