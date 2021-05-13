const { Router } = require('express');
const {
  categoriesGetController,
  categoryGetIdController,
  categoryUpdatedPutController,
  createCategoryController,
  categoryDeleteController,
} = require('../controllers/categories.controller');

const {
  checkPostCategory,
  checkGetByIdCategory,
  checkPutCategory,
  checkDeleteCategory,
} = require('../middlewares/checkCategoryFields');

const router = Router();

// Get all categories - public
router.get('/', categoriesGetController);

// Get Category by Id - public
router.get('/:id', checkGetByIdCategory, categoryGetIdController);

// Create Category - private with token
router.post('/', checkPostCategory, createCategoryController);

// Updated Category - private with token
router.put('/:id', checkPutCategory, categoryUpdatedPutController);

// Deleted Category - private only ADMIN_ROLE
router.delete('/:id', checkDeleteCategory, categoryDeleteController);

module.exports = router;
