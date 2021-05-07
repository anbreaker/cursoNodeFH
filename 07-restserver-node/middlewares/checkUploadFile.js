const { check } = require('express-validator');

const { hasRole } = require('./validateRole');
const { validateJWT } = require('./validateJWT');
const { validateFields } = require('../middlewares/validateFields');
const { validateAllowedCollections } = require('../helpers/dbValidators');
const { validateFileUpload } = require('./validateFile');

/*

hasRole('ADMIN_ROLE', 'SALE_ROLE'),

*/

const checkPostUpdateFile = [validateFileUpload];

const checkPutUpdateFile = [
  // validateJWT,
  validateFileUpload,
  check('id', 'It is not a valid Mongo id').isMongoId(),
  check('collection').custom((c) => validateAllowedCollections(c, ['users', 'products'])),
  validateFields,
];

module.exports = { checkPostUpdateFile, checkPutUpdateFile };
