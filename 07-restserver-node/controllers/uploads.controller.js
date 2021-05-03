const { response, request } = require('express');

const { uploadFile } = require('../helpers/uploadFiles');
const User = require('../models/user.model');
const Product = require('../models/product.model');

const loadFiles = async (req = request, res = response) => {
  //name obj postman (file)
  // TODO crear middleware de esto
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file)
    return res.status(400).send({ msg: 'No files were uploaded.' });

  try {
    const validateExtension = ['png', 'jpg', 'jpeg', 'gif'];
    const name = await uploadFile(req.files, validateExtension, 'images');

    res.json({ name });
  } catch (msg) {
    console.log(msg);
    res.status(400).json({ msg });
  }
};

const updateFile = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);

      if (!model)
        return res.status(400).json({ msg: `There is not User with the '${id}'.` });
      break;

    case 'products':
      model = await Product.findById(id);

      if (!model)
        return res.status(400).json({ msg: `There is not Product with the '${id}'.` });
      break;

    default:
      return res.status(500).json({ msg: 'Shit!, Forget to validate...' });
  }

  const name = await await uploadFile(req.files, undefined, collection);
  model.img = name;

  await model.save();

  res.json({ model });
};

module.exports = { loadFiles, updateFile };
