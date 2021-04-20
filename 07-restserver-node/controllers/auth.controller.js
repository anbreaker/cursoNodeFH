const { response, request } = require('express');

const loginController = (req, res = response) => {
  res.json({
    msg: 'Login Ok',
  });
};

module.exports = { loginController };
