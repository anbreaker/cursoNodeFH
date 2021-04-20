const { Router } = require('express');
const { loginController } = require('../controllers/auth.controller');

const { checkPostAuth } = require('../middlewares/checkAuthFields');

const router = Router();

router.post('/login', checkPostAuth, loginController);

module.exports = router;
