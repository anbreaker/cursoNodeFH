const { Router } = require('express');

const { loadFiles, updateFile } = require('../controllers/uploads.controller');
const {
  checkPostUpdateFile,
  checkPutUpdateFile,
} = require('../middlewares/checkUploadFile');

const router = Router();

router.post('/', checkPostUpdateFile, loadFiles);

router.put('/:collection/:id', checkPutUpdateFile, updateFile);

module.exports = router;
