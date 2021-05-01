const { Router } = require('express');
const { loadFiles } = require('../controllers/uploads.controller');

const router = Router();

router.post('/', loadFiles);

module.exports = router;
