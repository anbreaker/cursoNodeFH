const { response, request } = require('express');

const validateFileUpload = (req = request, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file)
    return res.status(400).send({ msg: 'No files were uploaded. - validateFileUpload' });

  next();
};

module.exports = { validateFileUpload };
