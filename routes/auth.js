const routes = require('express').Router();
const passport = require('passport');

routes.get('/', (req, res) => {
  res.render('login', { title: 'Loggin Page' });
});

routes.get('/admin', (req, res) => {
  res.render('admin-login', { title: 'Logging Admin' });
});

routes.post(
  '/admin',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/admin',
  })
);

routes.get('/google', passport.authenticate('google', { scope: ['profile'] }));
routes.use(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (rer, res) => {
    res.redirect('/dashboard');
  }
);

module.exports = routes;
