const { check, validationResult } = require('express-validator');

exports.patientValidation = [
  check('googleID', 'Google ID is mandatory').not().isEmpty(),
  check('displayName', 'displayName by is required').not().isEmpty(),
  check('firstName', 'firstName is required').not().isEmpty(),
  check('image', 'image is required').not().isEmpty(),
  check('birth', 'Please, provide a birthday').not().isEmpty(),
  check('createdAt', 'createdAt is required').not().isEmpty(),
  check('role', 'Please, provide a Task Name').not().isEmpty(),
];

exports.userValidation = [
  check('username', 'Username is mandatory').not().isEmpty(),
  check('displayName', 'Created by is required').not().isEmpty(),
  check('firstName', 'Due date is required').not().isEmpty(),
  check('image', 'Shared with is required').not().isEmpty(),
  check('birth', 'Please, provide a Task Name').not().isEmpty(),
  check('password', 'Please, provide a Task Name').not().isEmpty(),
  check('role', 'Please, provide a Task Name').not().isEmpty(),
];

exports.invoiceValidation = [
  check('date', 'Date is mandatory').not().isEmpty(),
  check('hour', 'Hour is mandatory').not().isEmpty(),
  check('doctorId', 'Doctor ID is mandatory').not().isEmpty(),
  check('patientId', 'Patiend ID is mandatory').not().isEmpty(),
  check('appointmentId', 'Appointment ID is mandatory').not().isEmpty(),
  check('status', 'Status is mandatory').not().isEmpty(),
  check('price', 'Price is mandatory').not().isEmpty(),
];

exports.appointmentValidation = [
  check('date', 'Date is mandatory').not().isEmpty(),
  check('hour', 'Hour is mandatory').not().isEmpty(),
  check('doctorId', 'Doctor ID is mandatory').not().isEmpty(),
  check('patientId', 'Patiend ID is mandatory').not().isEmpty(),
  check('status', 'Status is mandatory').not().isEmpty(),
];

exports.results = validationResult;
