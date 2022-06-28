const { check, validationResult } = require('express-validator');

exports.patientValidation = [
  check('googleID', 'Google ID it is mandatory').not().isEmpty(),
  check('displayName', 'Created by is required').not().isEmpty(),
  check('firstName', 'Due date is required').not().isEmpty(),
  check('image', 'Shared with is required').not().isEmpty(),
  check('birth', 'Please, provide a Task Name').not().isEmpty(),
  check('createdAt', 'Please, provide a Task Name').not().isEmpty(),
  check('role', 'Please, provide a Task Name').not().isEmpty(),
];

exports.userValidation = [
  check('firstName', 'First Name is required').not().isEmpty(),
  check('lastName', 'Last Name is required').not().isEmpty(),
  check('email', 'Please include a valid email')
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check('role', 'Role is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
];

exports.results = validationResult;
