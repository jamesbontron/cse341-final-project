const routes = require('express').Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

routes.get('/', (req, res) => {
  res.render('index', { title: 'Medical Appointment Scheduler' });
});
routes.get('/dashboard', ensureAuth, (req, res) => {
  console.log(req.user);
  res.render('dashboard', {
    title: 'Welcome to your dashboard',
    name: req.user.displayName,
  });
});
routes.use('/user', require('./user'));
routes.use('/patient', require('./patient'));
routes.use('/invoice', require('./invoice'));
routes.use('/appointment', require('./appointment'));
routes.use('/api-docs', require('./doc'));
routes.use('/auth', ensureGuest, require('./auth'));

module.exports = routes;
