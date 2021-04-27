const { response, request } = require('express');

const Product = require('../models/product.model');

// Get Products - pagintion - Total - populate
const productsGetController = async (req = request, res = response) => {
  const { limit = 3, from = 0 } = req.query;
  const query = { status: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query).populate('user', 'name').limit(Number(limit)).skip(Number(from)),
  ]);

  res.status(200).json({ total, products });
};

// Get Products - populate {}
const productGetByIdController = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const getProduct = await Product.findById(id).populate('user', 'name');

    res.status(200).json({ getProduct });
  } catch (error) {
    console.log(error);

    res.status(400).json({ msg: `Not Valid ${error}` });
  }
};

// Post Product
const createProductController = async (req = request, res = response) => {
  const { status, user, ...restParams } = req.body;

  try {
    const productDB = await Product.findOne({ name: restParams.name });

    if (productDB)
      return res
        .status(400)
        .json({ msg: `This product '${restParams.name}', already exists` });

    const data = {
      ...restParams,
      name: restParams.name.toUpperCase(),
      user: req.user._id,
    };

    const product = new Product(data);

    // Save Product on DB
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: 'Contact with admin.', error });
  }
};

// Updated Product

const productUpdatedPutController = async (req = request, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  console.log(data.user);

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.status(200).json({ product });
};

module.exports = {
  productsGetController,
  productGetByIdController,
  createProductController,
  productUpdatedPutController,
};
