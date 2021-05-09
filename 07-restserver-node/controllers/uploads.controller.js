const { response, request } = require('express');
const path = require('path');
const fs = require('fs');

const { uploadFile } = require('../helpers/uploadFiles');
const User = require('../models/user.model');
const Product = require('../models/product.model');

const getFile = async (req = request, res = response) => {
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

  try {
    if (model.img) {
      // Delete previous image
      const pathImg = path.join(__dirname, '../uploads', collection, model.img);

      if (fs.existsSync(pathImg)) return res.sendFile(pathImg);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Contact with admin.' });
  }

  res.json({ msg: 'Without PlaceHolder...' });
};

const loadFiles = async (req = request, res = response) => {
  //name obj postman (file)
  // TODO crear middleware de esto

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

  try {
    if (model.img) {
      // Delete previous image
      const pathImg = path.join(__dirname, '../uploads', collection, model.img);

      if (fs.existsSync(pathImg)) fs.unlinkSync(pathImg);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Contact with admin.' });
  }

  const name = await await uploadFile(req.files, undefined, collection);
  model.img = name;

  await model.save();

  res.json({ model });
};

module.exports = { getFile, loadFiles, updateFile };
