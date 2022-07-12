const routes = require('express').Router();
const {
  ensureAuth,
  ensureGuest,
  ensurePatient,
} = require('../middleware/auth');

routes.get('/', (req, res) => {
  res.render('index', { title: 'Medical Appointment Scheduler' });
});
routes.use('/dashboard', ensureAuth, require('./dashboard'));
routes.use('/user', ensureAuth, ensurePatient, require('./user'));
routes.use('/patient', ensureAuth, ensurePatient, require('./patient'));
routes.use('/invoice', ensureAuth, ensurePatient, require('./invoice'));
routes.use('/appointment', ensureAuth, require('./appointment'));
routes.use('/api-docs', require('./doc'));
routes.use('/auth', ensureGuest, require('./auth'));

module.exports = routes;
