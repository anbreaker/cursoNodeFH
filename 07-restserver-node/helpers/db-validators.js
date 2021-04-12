const Role = require('../models/role');

const isRoleValid = async (role = '') => {
  const existRole = await Role.findOne({ role });
  if (!existRole) throw new Error(`The ${role} is not registered in the database.`);
};

module.exports = { isRoleValid };
