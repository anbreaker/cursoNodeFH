const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role = '') => {
  const existRole = await Role.findOne({ role });
  if (!existRole) throw new Error(`The ${role} is not registered in the database.`);
};

const emailExist = async (email) => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(`This email: "${email}", already exists.`);
  }
};

module.exports = { isRoleValid, emailExist };
