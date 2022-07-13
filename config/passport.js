const GoogleStrategy = require('passport-google-oauth20').Strategy;
const PassportLocal = require('passport-local').Strategy;
const dbconnection = require('../model/dbconnection');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (acesssToken, refreshToken, profile, done) => {
        const newPatient = {
          googleID: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          image: profile.photos[0].value,
          birth: 'pending',
          createdAt: Date.now().toString(),
          role: 'patient',
        };
        try {
          let user = dbconnection
            .getPatient()
            .findOne({ googleID: profile.id });

          user.then((document) => {
            if (document) {
              console.log('Existing');
              done(null, user);
            } else {
              dbconnection.getPatient().insertOne(newPatient);
              console.log('registered');
              done(null, user);
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  passport.use(
    new PassportLocal((username, password, done) => {
      const user = dbconnection.getUser().findOne({ username: username });

      user.then((admin) => {
        if (!admin) {
          done(null, false);
        } else {
          if (username === admin.username && password === admin.password) {
            return done(null, user);
          } else {
            done(null, false);
          }
        }
      });
    })
  );

  passport.serializeUser((user, done) => {
    user.then((patient) => {
      done(null, patient);
    });
  });

  passport.deserializeUser((id, done) => {
    //console.log(`id: ${JSON.stringify(id)}`);
    //console.log(id._id);
    done(null, id);
  });
};
