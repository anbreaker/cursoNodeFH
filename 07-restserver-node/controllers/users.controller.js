const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

// Importacion de libreria para autoimportaciones de VsCode
// Renombrado de response para utilizar ayuda IDE
const usersGet = async (req = request, res = response) => {
  // TODO Validar entrada de limit y from
  const { limit = 3, from = 0 } = req.query;

  const users = await User.find().limit(Number(limit)).skip(Number(from));

  res.json({ users });
};

const usersPost = async (req, res = response) => {
  // const { google, ...paramsToSave } = req.body;
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });

  // Encriptar pass
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save on DB instance of User with data
  await user.save();

  res.json({
    msg: 'post API - controller',
    user,
  });
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;

  const { _id, password, google, email, ...restParams } = req.body;

  // TODO validar contra base de datos
  if (password) {
    // Encriptar pass
    const salt = bcryptjs.genSaltSync();
    restParams.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, restParams);

  res.json(user);
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - Controller',
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    msg: 'delete API - Controller',
  });
};

module.exports = { usersGet, usersPost, usersPut, usersPatch, usersDelete };
