const { Router } = require('express');

const {
  productsGetController,
  productGetByIdController,
  createProductController,
  productUpdatedPutController,
  productDeleteController,
} = require('../controllers/products.controller');
const {
  checkGetByIdProduct,
  checkPostProduct,
  checkPutProduct,
  checkDeleteProduct,
} = require('../middlewares/checkProductFields');

const router = Router();

// Get all Products - public
router.get('/', productsGetController);

// Get Product by Id - public
router.get('/:id', checkGetByIdProduct, productGetByIdController);

// Create Product - private with token
router.post('/', checkPostProduct, createProductController);

// Updated Category - private with token
router.put('/:id', checkPutProduct, productUpdatedPutController);

// Deleted Category - private only ADMIN_ROLE
router.delete('/:id', checkDeleteProduct, productDeleteController);

module.exports = router;
