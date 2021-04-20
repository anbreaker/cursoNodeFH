const { check } = require('express-validator');

const { isRoleValid, emailExist, userIdExist } = require('../helpers/dbValidators');
const { validateFields, validatePagination } = require('../middlewares/validateFields');

const checkGetUser = [validatePagination];

const checkPostUser = [
  check('name', 'Name is mandatory').not().isEmpty(),
  check('email', 'Email is not valid').isEmail(),
  check('email').custom(emailExist),
  check(
    'password',
    'Password is mandatory and should be at least 6 characters'
  ).isLength({ min: 6 }),
  // check('role', 'The role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  // validate to model role database
  check('role').custom(isRoleValid),
  validateFields,
];

const checkPutUser = [
  check('id', 'It is not a valid Mongo id').isMongoId(),
  check('id').custom(userIdExist),
  check('role').custom(isRoleValid),
  validateFields,
];

const checkDeleteUser = [
  check('id', 'It is not a valid Mongo id').isMongoId(),
  check('id').custom(userIdExist),
  validateFields,
];

module.exports = { checkGetUser, checkPostUser, checkPutUser, checkDeleteUser };
