const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const User = require('../models/user.model');
const Category = require('../models/category.model');
const Product = require('../models/product.model');

const searchUser = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term); // true

  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({ results: user ? [user] : [] });
  }

  const regex = new RegExp(term, 'i');

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  });

  return res.json({ results: users.length, users }); // Ever return--> [...data] o []
};

const searchCategory = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term);

  console.log('aqui');

  if (isMongoId) {
    const category = await Category.findById(term);
    return res.json({ results: category ? [category] : [] });
  }

  const regex = new RegExp(term, 'i');
  const categories = await Category.find({ name: regex, status: true });

  return res.json({ results: categories.length, categories });
};

const searchProducts = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const product = await Product.findById(term).populate('category', 'name');
    return res.json({ results: product ? [product] : [] });
  }

  const regex = new RegExp(term, 'i');
  const products = await Product.find({ name: regex, status: true }).populate(
    'category',
    'name'
  );

  return res.json({ results: products.length, categories: products });
};

module.exports = { searchUser, searchCategory, searchProducts };
