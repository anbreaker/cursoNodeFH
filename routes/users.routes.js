const { Router } = require('express');

const {
  checkGetUser,
  checkPostUser,
  checkPutUser,
  checkDeleteUser,
} = require('../middlewares/checkUserFields');
const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require('../controllers/users.controller');

const router = Router();

router.get('/', checkGetUser, usersGet);

router.post('/', checkPostUser, usersPost);

router.put('/:id', checkPutUser, usersPut);

router.patch('/', usersPatch);

router.delete('/:id', checkDeleteUser, usersDelete);

module.exports = router;
