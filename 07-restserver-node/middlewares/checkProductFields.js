const { check } = require('express-validator');

const { existCategoryById } = require('../helpers/dbValidators');
const { validateFields } = require('./validateFields');
const { validateJWT } = require('./validateJWT');

const checkGetByIdCategory = [
  check('id', 'It is not a valid Mongo id').isMongoId(),
  check('id').custom(existCategoryById),
  validateFields,
];

const checkPostProduct = [
  validateJWT,
  check('name', 'Product Name is mandatory.').not().isEmpty(),
  check('category', 'It is not a valid Mongo id').isMongoId(),
  check('category').custom(existCategoryById),
  validateFields,
];

const checkPutProduct = [
  validateJWT,
  check('name', 'Name is mandatory').not().isEmpty(),
  // check('id').custom(existCategoryById),
  validateFields,
];

module.exports = { checkGetByIdCategory, checkPostProduct, checkPutProduct };
