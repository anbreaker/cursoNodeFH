const { Router } = require('express');

const { getFile, loadFiles, updateFile } = require('../controllers/uploads.controller');
const {
  checkGetUpdateFile,
  checkPostUpdateFile,
  checkPutUpdateFile,
} = require('../middlewares/checkUploadFile');

const router = Router();

router.get('/:collection/:id', checkGetUpdateFile, getFile);

router.post('/', checkPostUpdateFile, loadFiles);

router.put('/:collection/:id', checkPutUpdateFile, updateFile);

module.exports = router;
