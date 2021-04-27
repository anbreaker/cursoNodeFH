const { Router } = require('express');

const {
  productsGetController,
  productGetByIdController,
  createProductController,
  productUpdatedPutController,
} = require('../controllers/products.controller');
const {
  checkGetByIdCategory,
  checkPostProduct,
  checkPutProduct,
} = require('../middlewares/checkProductFields');

const router = Router();

// Get all Products - public
router.get('/', productsGetController);

// Get Product by Id - public
router.get('/:id', checkGetByIdCategory, productGetByIdController);

// Create Product - private with token
router.post('/', checkPostProduct, createProductController);

// Updated Category - private with token
router.put('/:id', checkPutProduct, productUpdatedPutController);

module.exports = router;
