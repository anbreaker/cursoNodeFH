const { Router } = require('express');

const { createProductController } = require('../controllers/products.controller');
const { checkPostProduct } = require('../middlewares/checkProductFields');

const router = Router();

// Create Category - private with token
router.post('/', checkPostProduct, createProductController);

module.exports = router;
