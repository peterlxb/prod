const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys.js');


const PORT = process.env.PORT || 5000;
require('./models/Users');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    name: 'session',
    keys: [keys.cookieKey],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);



app.listen(PORT,() => console.log('Example app listening on port 5000!'))
