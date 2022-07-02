// Server Variables
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const exphbs = require('express-handlebars').engine;
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const dbconnection = require('./model/dbconnection');
//Connection to a database
dbconnection.connectDatabase();
//Passport Config
require('./config/passport')(passport);

// Settings
app.use(express.static(path.join(__dirname, 'assests')));
app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');

// Session
app.use(
  session({
    secret: 'medical appointment here',
    resave: false,
    saveUninitialized: false,
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Access to the routes
app.use(bodyParser.json()).use('/', require('./routes'));

//Listening to the port
app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});
