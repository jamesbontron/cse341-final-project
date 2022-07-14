module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/auth');
    }
  },
  ensureGuest: (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard');
    } else {
      return next();
    }
  },
  ensurePatient: (req, res, next) => {
    if (req.user.role === 'patient') {
      res.redirect('/dashboard');
    } else {
      return next();
    }
  },
  ensureUser: (req, res, next) => {
    if (req.user.role === 'doctor' || req.user.role === 'administrative') {
      res.redirect('/admin');
    } else {
      return next();
    }
  },
};
