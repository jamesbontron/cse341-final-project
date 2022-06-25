// Server Variables
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const dbconnection = require('./model/dbconnection');
//Connection to a database
dbconnection.connectDatabase();
//Access to the routes
app.use(bodyParser.json()).use('/', require('./routes'));
//Listening to the port
app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});
