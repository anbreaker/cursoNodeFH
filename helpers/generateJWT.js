const jwt = require('jsonwebtoken');

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

module.exports = { generateJWT };
