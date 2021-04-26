const { check } = require('express-validator');
const { existCategoryById } = require('../helpers/dbValidators');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('./validateJWT');

const checkGetByIdCategory = [
  check('id', 'It is not a valid Mongo id').isMongoId(),
  check('id').custom(existCategoryById),
  validateFields,
];

const checkPostCategory = [
  validateJWT,
  check('name', 'Name is mandatory').not().isEmpty(),
  validateFields,
];

module.exports = { checkGetByIdCategory, checkPostCategory };
