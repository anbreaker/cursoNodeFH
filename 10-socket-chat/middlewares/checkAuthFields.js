const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');

const checkPostAuth = [
  check('email', 'The email is mandatory').isEmail(),
  check(
    'password',
    'Password is mandatory and should be at least 6 characters'
  ).isLength({ min: 6 }),
  validateFields,
];

const checkPostGoogle = [
  check('id_token', '"id_token" is mandatory.').isLength({ min: 6 }),
  validateFields,
];

module.exports = { checkPostAuth, checkPostGoogle };
