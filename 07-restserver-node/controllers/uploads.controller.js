const { response, request } = require('express');
const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { uploadFile } = require('../helpers/uploadFiles');
const User = require('../models/user.model');
const Product = require('../models/product.model');

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

  const notFound = path.join(__dirname, '../assets/no-image.jpg');

  res.sendFile(notFound);
};

// Example with img on server
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

const updateFileCloudinary = async (req = request, res = response) => {
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
      // TODO Delete previous image Cloudinary
    }
    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
      folder: 'cursoNodeFH',
    });
    model.img = secure_url;
    await model.save();
    res.json({ model });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Contact with admin.' });
  }
};

module.exports = { getFile, loadFiles, updateFile, updateFileCloudinary };
