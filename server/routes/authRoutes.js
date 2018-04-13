const passport = require('passport');
const keys = require('../config/keys');

module.exports = (app) => {
    app.get('/auth/github',
        passport.authenticate('github', { scope: ['profile', 'email'] }),

    );

    app.get('/auth/github/callback',
        passport.authenticate('github'),
        function (req, res) {
          res.redirect('/surveys');
        }
      );

    app.get('/api/logout',(req,res) => {
      req.logout();
      res.redirect('/');
    });

    app.get('/api/current_user',(req, res) => {
      res.send(req.user);
    })
}
