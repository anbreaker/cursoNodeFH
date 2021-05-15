const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject('Could not generate token!');
        } else {
          resolve(token);
        }
      }
    );
  });
};

const checkJWT = async (token = '') => {
  try {
    if (token.length < 10) return null;

    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(uid);

    if (user) {
      if (user.status) return user;
      else return null;
    } else return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { generateJWT, checkJWT };
