const { check } = require('express-validator');

const { validateJWT } = require('./validateJWT');
const { validateFields } = require('./validateFields');
const { existCategoryById } = require('../helpers/dbValidators');

const checkPostProduct = [
  validateJWT,
  check('name', 'Name is mandatory').not().isEmpty(),
  check('category', 'It is not a valid Mongo id').isMongoId(),
  check('category').custom(existCategoryById),
  validateFields,
];

module.exports = { checkPostProduct };
