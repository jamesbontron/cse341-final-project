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
  logOut: (req, res, next) => {
    return req.logOut((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  },
};
