const { response, request } = require('express');
const { uploadFile } = require('../helpers/uploadFiles');

const loadFiles = async (req = request, res = response) => {
  //name obj postman (file)
  // TODO crear middleware de esto
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file)
    return res.status(400).send({ msg: 'No files were uploaded.' });

  const validateExtension = ['png', 'jpg', 'jpeg', 'gif'];

  const name = await uploadFile(req.files, validateExtension);

  res.json({ name });
};

module.exports = { loadFiles };
