const GoogleStrategy = require('passport-google-oauth20').Strategy;
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
  passport.serializeUser((user, done) => {
    user.then((patient) => {
      done(null, patient);
    });
  });

  passport.deserializeUser((id, done) => {
    console.log(`id: ${JSON.stringify(id)}`);
    console.log(id._id);
    done(null, id);
  });
};
