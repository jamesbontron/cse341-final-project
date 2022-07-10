const routes = require('express').Router();

routes.get('/', (req, res) => {
  //console.log(req.user);
  res.render('dashboard', {
    title: `Welcome to your dashboard ${req.user.firstName}`,
    name: req.user.displayName,
    image: req.user.image,
    role: req.user.role,
  });
});

routes.get('/add-appointment', (req, res) => {
  res.render('add-form', { title: 'Add an appointment' });
});

routes.get('/logout', (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = routes;
