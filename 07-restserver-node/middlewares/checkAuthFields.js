const { check } = require('express-validator');

const { isRoleValid, emailExist, userIdExist } = require('../helpers/dbValidators');

const { validateFields } = require('../middlewares/validateFields');

const checkPostAuth = [
  check(
    'password',
    'Password is mandatory and should be at least 6 characters'
  ).isLength({ min: 6 }),
  check('email', 'The email is mandatory').isEmail(),
  check('email').custom(emailExist),
  validateFields,
];

module.exports = { checkPostAuth };
