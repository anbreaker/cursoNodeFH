const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { isRoleValid } = require('../helpers/db-validators');
const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require('../controllers/users.controller');

const router = Router();

router.get('/', usersGet);

router.post(
  '/',
  [
    check('name', 'Name is mandatory').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
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

router.put('/:id', usersPut);

router.patch('/', usersPatch);

router.delete('/', usersDelete);

module.exports = router;
