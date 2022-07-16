const routes = require('express').Router();
const {
  ensureAuth,
  ensureGuest,
  ensurePatient,
  ensureUser,
} = require('../middleware/auth');

routes.get('/', (req, res) => {
  res.render('index', { title: 'Medical Appointment Scheduler' });
});
routes.use('/dashboard', ensureAuth, ensureUser, require('./dashboard'));
routes.use('/admin', ensureAuth, ensurePatient, require('./admin'));
routes.use('/user', require('./user'));
routes.use('/patient', require('./patient'));
//routes.use('/invoice', ensureAuth, ensurePatient, require('./invoice'));
routes.use('/invoice', require('./invoice'));
routes.use('/appointment', require('./appointment'));
routes.use('/api-docs', require('./doc'));
routes.use('/auth', ensureGuest, require('./auth'));

module.exports = routes;
