const routes = require('express').Router();
const { ObjectId } = require('mongodb');
const createError = require('http-errors');
const { appointmentValidation, results } = require('../validation');

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

// Get all Appointments
routes.get('/', (req, res) => {
  const appointment = dbconnection.getAppointment().find();

  appointment.toArray().then((documents) => {
    res.status(200).json(documents);
    console.log('All appointments shown');
  });
});

// Create an appointment
routes.post('/', appointmentValidation, (req, res) => {
  const result = results(req);
  if (!result.isEmpty()) {
    const errors = result.array();
    return res.status(400).json(errors);
  }

  const appointment = dbconnection.getAppointment().insertOne({
    date: req.body.date,
    hour: req.body.hour,
    doctorId: req.body.doctorId,
    patientId: req.body.patientId,
    patientComments: req.body.patientComments,
    doctorComments: req.body.doctorComments,
    status: req.body.status,
  });

  appointment.then((document) => {
    if (!document.insertedId)
      return res.status(404).send(`No appointment was added`);
    res.status(201).json(document);
    console.log(`appointment was created with id: ${document.insertedId}`);
  });
});

// Get a Appointment by Id
routes.get('/:id', (req, res) => {
  const passedId = req.params.id;
  if (!ObjectId.isValid(passedId)) {
    const error = createError(400, 'Invalid Id provided');
    return res.status(error.status).send(error);
  }
  const appointmentId = new ObjectId(passedId);

  const appointment = dbconnection
    .getAppointment()
    .findOne({ _id: appointmentId });

  appointment.then((document) => {
    if (!document)
      return res.status(404).send(`No appointment with id: ${req.params.id}`);
    res.status(200).json(document);
    console.log(`Appointment was retrieved with id: ${req.params.id}`);
  });
});

// Update a appointment by Id
routes.put('/:id', appointmentValidation, (req, res) => {
  const passedId = req.params.id;
  if (!ObjectId.isValid(passedId)) {
    const error = createError(400, 'Invalid Id provided');
    return res.status(error.status).send(error);
  }
  const appointmentId = new ObjectId(passedId);

  const result = results(req);
  if (!result.isEmpty()) {
    const errors = result.array();
    return res.status(400).json(errors);
  }

  const appointment = dbconnection.getAppointment().updateOne(
    {
      _id: appointmentId,
    },
    {
      $set: {
        date: req.body.date,
        hour: req.body.hour,
        doctorId: req.body.doctorId,
        patientId: req.body.patientId,
        patientComments: req.body.patientComments,
        doctorComments: req.body.doctorComments,
        status: req.body.status,
      },
    }
  );

  appointment.then((document) => {
    if (document.matchedCount >= 1) {
      if (document.modifiedCount < 1)
        return res
          .status(404)
          .send('Appointment could not be updated, nothing was changed');
      res.status(201).json(document);
      console.log(`Appointment was updated with id: ${req.params.id}`);
    } else {
      res
        .status(404)
        .send(`Appointment was not found with id: ${req.params.id}`);
    }
  });
});

// Delete an appointmet by Id
routes.delete('/:id', (req, res) => {
  const passedId = req.params.id;
  if (!ObjectId.isValid(passedId)) {
    const error = createError(400, 'Invalid Id provided');
    return res.status(error.status).send(error);
  }
  const appointmentId = new ObjectId(passedId);
  const appointment = dbconnection
    .getAppointment()
    .deleteOne({ _id: appointmentId });

  appointment.then((document) => {
    if (document.deletedCount < 1)
      return res
        .status(404)
        .send(
          `No appointment with id: ${req.params.id} or deleted was not processed`
        );
    res.status(200).json(document);
    console.log(`Appointment was deleted with id: ${req.params.id}`);
  });
});

module.exports = routes;
