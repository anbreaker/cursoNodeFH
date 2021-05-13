const { response, request } = require('express');

const verifyTokenExist = (user) => {
  if (!user)
    return res
      .status(500)
      .json({ mgs: 'The role is being verified without verifying the token first.' });
};

const isAdminRole = (req = request, res = response, next) => {
  verifyTokenExist(req.user);

  const { role, name } = req.user;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({ msg: `Not authorised, ${name}, not Admin` });
  }

  next();
};

// This function return other function
const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    verifyTokenExist(req.user);

    if (!roles.includes(req.user.role))
      return res.status(401).json({ msg: `One of these roles is required: ${roles}` });

    next();
  };
};

module.exports = { isAdminRole, hasRole };
