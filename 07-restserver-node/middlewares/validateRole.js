const { response, request } = require('express');

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user)
    return res
      .status(500)
      .json({ mgs: 'The role is being verified without verifying the token first.' });

  const { role, name } = req.user;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({ msg: `Not authorised, ${name}, not Admin` });
  }

  next();
};

module.exports = { isAdminRole };
