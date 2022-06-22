const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send(`Welcome to our API. Use this routes: /user, /invoice, /patient and /appointment. More information in /api-docs
  `);
});
//routes.use('/user', require('./user'));
//routes.use('/patient', require('./patient'));
//routes.use('/invoice', require('./invoice'));
//routes.use('/appointment', require('./appointment'));
routes.use('/api-docs', require('./doc'));

module.exports = routes;
