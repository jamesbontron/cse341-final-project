const routes = require('express').Router();
const { ObjectId } = require('mongodb');
const createError = require('http-errors');
const { userValidation, results } = require('../validation');
const dbconnection = require('../model/dbconnection');

routes.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://cse341-contacts-frontend.netlify.app'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Content-Type', 'application/json');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});

// Get all users
routes.get('/', (req, res) => {
  const user = dbconnection.getUser().find();

  user.toArray().then((documents) => {
    res.status(200).json(documents);
    console.log('All users shown');
  });
});

// Create a user
routes.post('/', userValidation, (req, res) => {
  const result = results(req);
  if (!result.isEmpty()) {
    const errors = result.array();
    return res.status(400).json(errors);
  }

  const user = dbconnection.getUser().insertOne({
    username: req.body.username,
    displayName: req.body.displayName,
    firstName: req.body.firstName,
    image: req.body.image,
    birth: req.body.birth,
    password: req.body.password,
    role: req.body.role,
  });

  user.then((document) => {
    if (!document.insertedId) return res.status(404).send(`No user was added`);
    res.status(201).json(document.insertedId);
    console.log(`User was created with id: ${document.insertedId}`);
  });
});

// Get a user by Id
routes.get('/:id', (req, res) => {
  const passedId = req.params.id;
  if (!ObjectId.isValid(passedId)) {
    const error = createError(400, 'Invalid Id provided');
    return res.status(error.status).send(error);
  }
  const userId = new ObjectId(passedId);

  const user = dbconnection.getUser().findOne({ _id: userId });

  user.then((document) => {
    if (!document)
      return res.status(404).send(`No user with id: ${req.params.id}`);
    res.status(200).json(document);
    console.log(`User was retrieved with id: ${req.params.id}`);
  });
});

// Update a user by Id
routes.put('/:id', (req, res) => {
  const passedId = req.params.id;
  if (!ObjectId.isValid(passedId)) {
    const error = createError(400, 'Invalid Id provided');
    return res.status(error.status).send(error);
  }
  const userId = new ObjectId(passedId);

  const result = results(req);
  if (!result.isEmpty()) {
    const errors = result.array();
    return res.status(400).json(errors);
  }

  const user = dbconnection.getUser().updateOne(
    {
      _id: userId,
    },
    {
      $set: {
        username: req.body.username,
        displayName: req.body.displayName,
        firstName: req.body.firstName,
        image: req.body.image,
        birth: req.body.birth,
        password: req.body.password,
        role: req.body.role,
      },
    }
  );

  user.then((document) => {
    if (document.matchedCount >= 1) {
      if (document.modifiedCount < 1)
        return res
          .status(404)
          .send('User could not be updated, nothing was changed');
      res.status(201).json(document);
      console.log(`User was updated with id: ${req.params.id}`);
    } else {
      res.status(404).send(`User was not found with id: ${req.params.id}`);
    }
  });
});

// Delete a user by Id
routes.delete('/:id', (req, res) => {
  const passedId = req.params.id;
  if (!ObjectId.isValid(passedId)) {
    const error = createError(400, 'Invalid Id provided');
    return res.status(error.status).send(error);
  }
  const userId = new ObjectId(passedId);
  const user = dbconnection.getUser().deleteOne({ _id: userId });

  user.then((document) => {
    if (document.deletedCount < 1)
      return res
        .status(404)
        .send(`No user with id: ${req.params.id} or deleted was not processed`);
    res.status(200).json(document);
    console.log(`User was deleted with id: ${req.params.id}`);
  });
});

module.exports = routes;
