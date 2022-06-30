const { check, validationResult } = require('express-validator');

exports.patientValidation = [
  check('googleID', 'Google ID is mandatory').not().isEmpty(),
  check('displayName', 'Created by is required').not().isEmpty(),
  check('firstName', 'Due date is required').not().isEmpty(),
  check('image', 'Shared with is required').not().isEmpty(),
  check('birth', 'Please, provide a Task Name').not().isEmpty(),
  check('createdAt', 'Please, provide a Task Name').not().isEmpty(),
  check('role', 'Please, provide a Task Name').not().isEmpty()
];

exports.userValidation = [
  check('googleID', 'Google ID is mandatory').not().isEmpty(),
  check('displayName', 'Created by is required').not().isEmpty(),
  check('firstName', 'Due date is required').not().isEmpty(),
  check('image', 'Shared with is required').not().isEmpty(),
  check('birth', 'Please, provide a Task Name').not().isEmpty(),
  check('createdAt', 'Please, provide a Task Name').not().isEmpty(),
  check('role', 'Please, provide a Task Name').not().isEmpty()
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
