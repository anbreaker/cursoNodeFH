const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');

const { validateFields } = require('../middlewares/validateFields');
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
    check('role').custom(async (role = '') => {
      const existRole = await Role.findOne({ role });
      if (!existRole) throw new Error(`The ${role} is not registered in the database.`);
    }),
    validateFields,
  ],
  usersPost
);

router.put('/:id', usersPut);

router.patch('/', usersPatch);

router.delete('/', usersDelete);

module.exports = router;
