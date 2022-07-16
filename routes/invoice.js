const routes = require('express').Router();
const { ObjectId } = require('mongodb');
const createError = require('http-errors');
const { invoiceValidation, results } = require('../validation');
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

// Get all Invoices
routes.get('/', (req, res) => {
  const invoice = dbconnection.getInvoice().find();

  invoice.toArray().then((documents) => {
    res.status(200).json(documents);
    //console.log('All users shown');
  });
});

// Create an Invoice
routes.post('/', invoiceValidation, (req, res) => {
  const result = results(req);
  if (!result.isEmpty()) {
    const errors = result.array();
    return res.status(400).json(errors);
  }

  const invoice = dbconnection.getInvoice().insertOne({
    date: req.body.date,
    hour: req.body.hour,
    doctorId: req.body.doctorId,
    patientId: req.body.patientId,
    appointmentId: req.body.appointmentId,
    doctorComments: req.body.doctorComments,
    status: req.body.status,
    price: req.body.price,
  });

  invoice.then((document) => {
    if (!document.insertedId)
      return res.status(404).send(`No invoice was added`);
    res.status(201).json(document.insertedId);
    console.log(`Invoice was created with id: ${document.insertedId}`);
  });
});

// Get an invoice by Id
routes.get('/:id', (req, res) => {
  const passedId = req.params.id;
  if (!ObjectId.isValid(passedId)) {
    const error = createError(400, 'Invalid Id provided');
    return res.status(error.status).send(error);
  }
  const invoiceId = new ObjectId(passedId);

  const invoice = dbconnection.getInvoice().findOne({ _id: invoiceId });

  invoice.then((document) => {
    if (!document)
      return res.status(404).send(`No invoice with id: ${req.params.id}`);
    res.status(200).json(document);
    console.log(`Invoice was retrieved with id: ${req.params.id}`);
  });
});

// Update a user by Id
routes.put('/:id', (req, res) => {
  const passedId = req.params.id;
  /*if (!ObjectId.isValid(passedId)) {
    const error = createError(400, 'Invalid Id provided');
    return res.status(error.status).send(error);
  }*/
  const invoiceId = new ObjectId(passedId);
  /*
  const result = results(req);
  if (!result.isEmpty()) {
    const errors = result.array();
    return res.status(400).json(errors);
  }*/

  const invoice = dbconnection.getInvoice().updateOne(
    {
      _id: invoiceId,
    },
    {
      $set: {
        date: req.body.date,
        hour: req.body.hour,
        doctorId: req.body.doctorId,
        patientId: req.body.patientId,
        appointmentId: req.body.appointmentId,
        doctorComments: req.body.doctorComments,
        status: req.body.status,
        price: req.body.price,
      },
    }
  );

  invoice.then((document) => {
    if (document.matchedCount >= 1) {
      if (document.modifiedCount < 1)
        return res
          .status(404)
          .send('Invoice could not be updated, nothing was changed');
      res.status(201).json(document);
      console.log(`Invoice was updated with id: ${req.params.id}`);
    } else {
      res.status(404).send(`Invoice was not found with id: ${req.params.id}`);
    }
  });
});

// Delete a user by Id
routes.delete('/:id', (req, res) => {
  const passedId = req.params.id;
  /*if (!ObjectId.isValid(passedId)) {
    const error = createError(400, 'Invalid Id provided');
    return res.status(error.status).send(error);
  }*/
  const invoiceId = new ObjectId(passedId);
  const invoice = dbconnection.getInvoice().deleteOne({ _id: invoiceId });

  invoice.then((document) => {
    if (document.deletedCount < 1)
      return res
        .status(404)
        .send(
          `No invoice with id: ${req.params.id} or deleted was not processed`
        );
    res.status(200).json(document);
    console.log(`invoice was deleted with id: ${req.params.id}`);
  });
});

module.exports = routes;
