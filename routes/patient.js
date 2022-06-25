const routes = require('express').Router();
const { ObjectId } = require('mongodb');
//const createError = require('http-errors');
//const { userValidation, results } = require('../validation');

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

// Get all patients
routes.get('/', (req, res) => {
  const patient = dbconnection.getPatient().find();

  patient.toArray().then((documents) => {
    res.status(200).json(documents);
    console.log('All Patients shown');
  });
});

// Create a patient
routes.post('/', (req, res) => {
  /*const result = results(req);
  if (!result.isEmpty()) {
    const errors = result.array();
    return res.status(400).json(errors);
  }*/

  const patient = dbconnection.getPatient().insertOne({
    googleID: req.body.googleID,
    displayName: req.body.displayName,
    firstName: req.body.firstName,
    image: req.body.image,
    birth: req.body.birth,
    createdAt: req.body.createdAt,
    role: req.body.role,
  });

  patient.then((document) => {
    if (!document.insertedId) return res.status(404).send(`No user was added`);
    res.status(201).redirect(`/patient/${document.insertedId}`);
    console.log(`User was created with id: ${document.insertedId}`);
  });
});

// Get a patient by Id
routes.get('/:id', (req, res) => {
  const passedId = req.params.id;
  /*if (!ObjectId.isValid(passedId)) {
    const error = createError(400, 'Invalid Id provided');
    return res.status(error.status).send(error);
  }*/
  const patientId = new ObjectId(passedId);

  const patient = dbconnection.getPatient().findOne({ _id: patientId });

  patient.then((document) => {
    if (!document)
      return res.status(404).send(`No patient with id: ${req.params.id}`);
    res.status(200).json(document);
    console.log(`Patient was retrieved with id: ${req.params.id}`);
  });
});

// Update a patient by Id
routes.put('/:id', (req, res) => {
  const passedId = req.params.id;
  /*if (!ObjectId.isValid(passedId)) {
    const error = createError(400, 'Invalid Id provided');
    return res.status(error.status).send(error);
  }*/
  const patientId = new ObjectId(passedId);
  /*
  const result = results(req);
  if (!result.isEmpty()) {
    const errors = result.array();
    return res.status(400).json(errors);
  }
*/
  const patient = dbconnection.getPatient().updateOne(
    {
      _id: patientId,
    },
    {
      $set: {
        googleID: req.body.googleID,
        displayName: req.body.displayName,
        firstName: req.body.firstName,
        image: req.body.image,
        birth: req.body.birth,
        createdAt: req.body.createdAt,
        role: req.body.role,
      },
    }
  );

  patient.then((document) => {
    if (document.matchedCount >= 1) {
      if (document.modifiedCount < 1)
        return res
          .status(404)
          .send('Patient could not be updated, nothing was changed');
      res.status(201).json(document);
      console.log(`Patient was updated with id: ${req.params.id}`);
    } else {
      res.status(404).send(`Patient was not found with id: ${req.params.id}`);
    }
  });
});

// Delete a patient by Id
routes.delete('/:id', (req, res) => {
  const passedId = req.params.id;
  /*if (!ObjectId.isValid(passedId)) {
    const error = createError(400, 'Invalid Id provided');
    return res.status(error.status).send(error);
  }*/
  const patientId = new ObjectId(passedId);
  const patient = dbconnection.getPatient().deleteOne({ _id: patientId });

  patient.then((document) => {
    if (document.deletedCount < 1)
      return res
        .status(404)
        .send(
          `No patient with id: ${req.params.id} or deleted was not processed`
        );
    res.status(200).json(document);
    console.log(`Patient was deleted with id: ${req.params.id}`);
  });
});

module.exports = routes;
