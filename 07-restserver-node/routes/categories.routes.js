const { Router } = require('express');
const {
  categoryGetController,
  categoryGetIdController,
  createCategoryController,
  categoryPutController,
  categoryDeleteController,
} = require('../controllers/categories.controller');

const { checkPostCategory } = require('../middlewares/checkCategoryFields');

const router = Router();

// Get all categories - public
router.get('/', categoryGetController);

// Get Category by Id - public
router.get('/:id', categoryGetIdController);

// Create Category - private with token
router.post('/', checkPostCategory, createCategoryController);

// Updated Category - private with token
router.put('/:id', categoryPutController);

// Deleted Category - private only ADMIN_ROLE
router.delete('/:id', categoryDeleteController);

module.exports = router;
