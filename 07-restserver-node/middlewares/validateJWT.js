const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
  const token = req.header('bearer');

  if (!token) return res.status(401).json({ mgs: 'No token exists in the request' });

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ mgs: 'Token not Valid' });
  }
};

module.exports = { validateJWT };
