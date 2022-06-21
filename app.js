// Server Variables
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const dbconnection = require('./model/dbconnection');

dbconnection.connectDatabase();

app.use(bodyParser.json()).use('/', require('./routes'));

app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});
