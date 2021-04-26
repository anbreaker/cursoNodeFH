const { response, request } = require('express');

const Category = require('../models/category.model');

// Get Categories - pagintion - Total - populate
const categoriesGetController = async (req = request, res = response) => {
  const { limit = 3, from = 0 } = req.query;
  const query = { status: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query).populate('user', 'name').limit(Number(limit)).skip(Number(from)),
  ]);

  res.status(200).json({ total, categories });
};

// Get Categories - populate {}
const categoryGetIdController = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    console.log('aqui');

    const getCategory = await Category.findById(id).populate('user', 'name');

    res.status(200).json({ getCategory });
  } catch (error) {
    console.log(error);

    res.status(400).json({ msg: `Not Valid ${error}` });
  }
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

// Updated Category
const categoryUpdatedPutController = async (req = request, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  data.name = data.name.toUpperCase();

  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, data, { new: true });

  res.status(200).json({ category });
};

// Delete by Status
const categoryDeleteController = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const deleteCategory = await Category.findByIdAndUpdate(
      id,
      { status: false },
      { returnOriginal: false } // Para ver el dato actual en postman
    );

    res.json({ category: deleteCategory });
  } catch (error) {
    console.log(error);

    res.status(400).json({ msg: `An Error ${error}` });
  }
};

module.exports = {
  categoriesGetController,
  categoryGetIdController,
  categoryUpdatedPutController,
  createCategoryController,
  categoryDeleteController,
};
