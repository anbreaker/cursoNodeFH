const path = require('path');
const { response, request } = require('express');

const loadFiles = async (req = request, res = response) => {
  //name obj postman (file)
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file)
    return res.status(400).send({ msg: 'No files were uploaded.' });

  const { file } = req.files;

  const uploadPath = path.join(__dirname, '../uploads/', file.name);

  file.mv(uploadPath, (error) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ error });
    }

    res.json({ msg: 'File uploaded to ' + uploadPath });
  });
};

module.exports = { loadFiles };
