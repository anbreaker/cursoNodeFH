const { response, request } = require('express');

const Product = require('../models/product.model');

const createProductController = async (req = request, res = response) => {
  const { status, user, ...restParams } = req.body;

  try {
    const productDB = await Product.findOne({ name: restParams.name });

    if (productDB)
      return res
        .status(400)
        .json({ msg: `This category ${productDB.name}, already exists` });

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

module.exports = { createProductController };
