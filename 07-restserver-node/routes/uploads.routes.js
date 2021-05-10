const { Router } = require('express');

const {
  getFile,
  loadFiles,
  // updateFile,
  updateFileCloudinary,
} = require('../controllers/uploads.controller');
const {
  checkGetUpdateFile,
  checkPostUpdateFile,
  checkPutUpdateFile,
} = require('../middlewares/checkUploadFile');

const router = Router();

router.get('/:collection/:id', checkGetUpdateFile, getFile);

router.post('/', checkPostUpdateFile, loadFiles);

// Example with img on server
// router.put('/:collection/:id', checkPutUpdateFile, updateFile);

// Imgaes on Cloudinary
router.put('/:collection/:id', checkPutUpdateFile, updateFileCloudinary);

module.exports = router;
