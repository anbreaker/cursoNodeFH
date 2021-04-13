const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validatePagination } = require('../middlewares/validateFields');
const { isRoleValid, emailExist, userIdExist } = require('../helpers/dbValidators');
const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require('../controllers/users.controller');

const router = Router();

router.get('/', [validatePagination], usersGet);

router.post(
  '/',
  [
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
  ],
  usersPost
);

router.put(
  '/:id',
  [
    check('id', 'It is not a valid Mongo id').isMongoId(),
    check('id').custom(userIdExist),
    check('role').custom(isRoleValid),
    validateFields,
  ],
  usersPut
);

router.patch('/', usersPatch);

router.delete(
  '/:id',
  [
    check('id', 'It is not a valid Mongo id').isMongoId(),
    check('id').custom(userIdExist),
    validateFields,
  ],
  usersDelete
);

module.exports = router;
