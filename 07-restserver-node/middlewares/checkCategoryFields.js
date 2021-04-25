const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('./validateJWT');

const checkPostCategory = [
  validateJWT,
  check('name', 'Name is mandatory').not().isEmpty(),
  validateFields,
];

module.exports = { checkPostCategory };
