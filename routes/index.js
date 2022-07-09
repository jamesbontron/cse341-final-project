const routes = require('express').Router();
const {
  ensureAuth,
  ensureGuest,
  ensurePatient,
  logOut,
} = require('../middleware/auth');

routes.get('/', (req, res) => {
  res.render('index', { title: 'Medical Appointment Scheduler' });
});
routes.get('/dashboard', ensureAuth, (req, res) => {
  //console.log(req.user);
  res.render('dashboard', {
    title: `Welcome to your dashboard ${req.user.firstName}`,
    name: req.user.displayName,
    image: req.user.image,
    role: req.user.role,
  });
});
routes.use('/user', ensureAuth, ensurePatient, require('./user'));
routes.use('/patient', ensureAuth, ensurePatient, require('./patient'));
routes.use('/invoice', ensureAuth, ensurePatient, require('./invoice'));
routes.use('/appointment', ensureAuth, ensurePatient, require('./appointment'));
routes.use('/api-docs', require('./doc'));
routes.use('/auth', ensureGuest, require('./auth'));
routes.use('/logout', logOut);

module.exports = routes;
