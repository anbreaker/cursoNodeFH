const { response, request } = require('express');

const Category = require('../models/category.model');

const categoryGetController = async (req = request, res = response) => {
  res.status(200).json({ msg: 'Categories - Get' });
};

const categoryGetIdController = async (req = request, res = response) => {
  res.status(200).json({ msg: 'Categories - Get by id' });
};

const createCategoryController = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();
  try {
    const categoryDB = await Category.findOne({ name });

    if (categoryDB)
      return res
        .status(400)
        .json({ msg: `This category ${categoryDB.name} already exists` });

    // Data to Save
    const data = {
      name,
      user: req.user._id,
    };

    const category = new Category(data);

    // Save Category on DB
    await category.save();

    res.status(201).json({ category });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: 'Contact with admin.' });
  }
};

const categoryPutController = async (req = request, res = response) => {
  res.status(200).json({ msg: 'Categories - Put' });
};

const categoryDeleteController = async (req = request, res = response) => {
  res.status(200).json({ msg: 'Categories - Delete' });
};

module.exports = {
  categoryGetController,
  categoryGetIdController,
  createCategoryController,
  categoryPutController,
  categoryDeleteController,
};
