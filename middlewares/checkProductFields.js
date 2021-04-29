const { check } = require('express-validator');

const { existCategoryById, existProductById } = require('../helpers/dbValidators');
const { validateFields } = require('./validateFields');
const { validateJWT } = require('./validateJWT');
const { isAdminRole } = require('./validateRole');

const checkGetByIdProduct = [
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
  // check('name', 'Name is mandatory').not().isEmpty(), // Para que se actualice cualquier campo...
  check('id', 'It is not a valid Mongo id').isMongoId(),
  check('id').custom(existProductById),
  validateFields,
];

const checkDeleteProduct = [
  validateJWT,
  isAdminRole,
  check('id', 'It is not a valid Mongo id').isMongoId(),
  check('id').custom(existProductById),
  validateFields,
];

module.exports = {
  checkGetByIdProduct,
  checkPostProduct,
  checkPutProduct,
  checkDeleteProduct,
};
