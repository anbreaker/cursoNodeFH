const { check } = require('express-validator');

const { isRoleValid, emailExist, userIdExist } = require('../helpers/dbValidators');
const { validateFields, validatePagination } = require('../middlewares/validateFields');
const { validateJWT } = require('./validateJWT');
const { isAdminRole, hasRole } = require('./validateRole');

const checkGetUser = [validatePagination];

const checkPostUser = [
  validateJWT,
  hasRole('ADMIN_ROLE', 'SALE_ROLE'),
  check('name', 'Name is mandatory.').not().isEmpty(),
  check('email', 'Email is not valid').isEmail(),
  check('email').custom(emailExist),
  check(
    'password',
    'Password is mandatory and should be at least 6 characters'
  ).isLength({ min: 6 }),
  // validate to model role database
  check('role').custom(isRoleValid),
  validateFields,
];

const checkPutUser = [
  validateJWT,
  check('id', 'It is not a valid Mongo id').isMongoId(),
  check('id').custom(userIdExist),
  // TODO Revisar isRoleValid
  check('role').custom(isRoleValid),
  validateFields,
];

const checkDeleteUser = [
  validateJWT,
  // isAdminRole,
  hasRole('ADMIN_ROLE', 'USER_ROLE', 'SALE_ROLE'),
  check('id', 'It is not a valid Mongo id').isMongoId(),
  check('id').custom(userIdExist),
  validateFields,
];

module.exports = { checkGetUser, checkPostUser, checkPutUser, checkDeleteUser };
