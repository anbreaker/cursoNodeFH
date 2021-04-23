const { Router } = require('express');
const { loginController } = require('../controllers/auth.controller');

const { checkPostAuth, checkPostGoogle } = require('../middlewares/checkAuthFields');

const router = Router();

router.post('/login', checkPostAuth, loginController);

router.post('/google', checkPostGoogle, loginController);

module.exports = router;
