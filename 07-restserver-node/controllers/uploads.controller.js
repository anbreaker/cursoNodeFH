const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { response, request } = require('express');

const loadFiles = async (req = request, res = response) => {
  //name obj postman (file)
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file)
    return res.status(400).send({ msg: 'No files were uploaded.' });

  const { file } = req.files;

  const cutName = file.name.split('.');
  const extension = cutName[cutName.length - 1];

  // Validate extension
  const validateExtension = ['png', 'jpg', 'jpeg', 'gif'];

  if (!validateExtension.includes(extension))
    res.status(400).json({
      msg: `This extension '${extension}' not is permited, Examples: ${validateExtension}`,
    });

  const saveNameFile = `${uuidv4()}.${extension}`;
  const uploadPath = path.join(__dirname, '../uploads/', saveNameFile);

  file.mv(uploadPath, (error) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ error });
    }

    res.json({ msg: 'File uploaded to ' + uploadPath });
  });
};

module.exports = { loadFiles };
