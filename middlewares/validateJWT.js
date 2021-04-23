const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('bearer');

  if (!token) return res.status(401).json({ mgs: 'No token exists in the request' });

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(uid);

    if (!user)
      return res.status(401).json({ msg: 'Token not Valid - No user exists on DB' });

    // Validar si el estado del usuario esta en true
    console.log(user.status);

    if (!user.status)
      return res.status(401).json({ msg: 'Token not Valid - User with Status False' });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ mgs: 'Token not Valid' });
  }
};

module.exports = { validateJWT };
