const routes = require('express').Router();
const passport = require('passport');

routes.get('/', (req, res) => {
  res.render('login', { title: 'Logginredirect' });
});
routes.get('/google', passport.authenticate('google', { scope: ['profile'] }));
routes.use(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (rer, res) => {
    res.redirect('/dashboard');
  }
);

routes.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = routes;
