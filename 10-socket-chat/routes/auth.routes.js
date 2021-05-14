const { Router } = require('express');
const {
  loginController,
  googleSignin,
  renewToken,
} = require('../controllers/auth.controller');

const {
  checkGetAuth,
  checkPostAuth,
  checkPostGoogle,
} = require('../middlewares/checkAuthFields');

const router = Router();

router.get('/', checkGetAuth, renewToken);

router.post('/login', checkPostAuth, loginController);

router.post('/google', checkPostGoogle, googleSignin);

module.exports = router;
