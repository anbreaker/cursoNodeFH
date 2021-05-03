const { Router } = require('express');

const { loadFiles, updateFile } = require('../controllers/uploads.controller');
const { checkPutUpdateFile } = require('../middlewares/checkUploadFile');

const router = Router();

router.post('/', loadFiles);

router.put('/:collection/:id', checkPutUpdateFile, updateFile);

module.exports = router;
