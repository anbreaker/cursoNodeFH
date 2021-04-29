const { check } = require('express-validator');

const { existCategoryById } = require('../helpers/dbValidators');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('./validateJWT');
const { isAdminRole } = require('./validateRole');

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

const checkPutCategory = [
  validateJWT,
  check('name', 'Name is mandatory').not().isEmpty(),
  // check('category', 'It is not a valid Mongo id').isMongoId(),
  check('id').custom(existCategoryById),
  validateFields,
];

const checkDeleteCategory = [
  validateJWT,
  isAdminRole,
  check('id', 'It is not a valid Mongo id').isMongoId(),
  check('id').custom(existCategoryById),
  validateFields,
];

module.exports = {
  checkGetByIdCategory,
  checkPostCategory,
  checkPutCategory,
  checkDeleteCategory,
};
