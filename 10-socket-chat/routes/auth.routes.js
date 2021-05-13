const { Router } = require('express');
const { loginController, googleSignin } = require('../controllers/auth.controller');

const { checkPostAuth, checkPostGoogle } = require('../middlewares/checkAuthFields');

const router = Router();

router.post('/login', checkPostAuth, loginController);

router.post('/google', checkPostGoogle, googleSignin);

module.exports = router;
