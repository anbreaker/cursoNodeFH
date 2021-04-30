const Role = require('../models/role.model');
const User = require('../models/user.model');
const Category = require('../models/category.model');
const Product = require('../models/category.model');

const isRoleValid = async (role = '') => {
  const existRole = await Role.findOne({ role });

  if (!existRole) throw new Error(`The rol '${role}' is not registered in the database.`);
};

const emailExist = async (email) => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(`This email: "${email}", already exists.`);
  }
};

const userIdExist = async (id) => {
  const existUser = await User.findById(id);

  if (!existUser) {
    throw new Error(`The user with "${id}", does not exist.`);
  }
};

const existCategoryById = async (id) => {
  const idExist = await Category.find({ id });

  if (!idExist) throw new Error(`The id ${id} does not exist.`);
};

const existProductById = async (id) => {
  const existProduct = await Product.find({ id });

  if (!existProduct) throw new Error(`The id ${id} does not exist`);
};

module.exports = {
  isRoleValid,
  emailExist,
  userIdExist,
  existCategoryById,
  existProductById,
};
