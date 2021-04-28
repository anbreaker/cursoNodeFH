const { response, request } = require('express');
const { ObjectId } = require('mongoose').Types;

const User = require('../models/user.model');
const Category = require('../models/category.model');
const Product = require('../models/product.model');

const collectionsAllowed = ['users', 'category', 'products', 'roles'];

const searchUser = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term); // true

  if (isMongoId) {
    const user = await User.findById(term);
    res.json({ results: user ? [user] : [] });
  }
};

const search = async (req = request, res = response) => {
  const { collection, term } = req.params;

  if (!collectionsAllowed.includes(collection))
    return res
      .status(400)
      .json({ msg: `Collections allowed to search ${collectionsAllowed}` });

  switch (collection) {
    case 'users':
      searchUser(term, res);
      break;
    case 'category':
      //
      break;
    case 'products':
      //
      break;
    default:
      res.status(500).json({ msg: 'Forget to search...' });
  }
};

module.exports = { search };
