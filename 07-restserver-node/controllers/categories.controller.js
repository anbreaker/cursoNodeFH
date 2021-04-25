const { response, request } = require('express');

const categoryGetController = async (req = request, res = response) => {
  res.status(200).json({ msg: 'Categories - Get' });
};

const categoryGetIdController = async (req = request, res = response) => {
  res.status(200).json({ msg: 'Categories - Get by id' });
};

const categoryPostController = async (req = request, res = response) => {
  res.status(200).json({ msg: 'Categories - Post' });
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
  categoryPostController,
  categoryPutController,
  categoryDeleteController,
};
