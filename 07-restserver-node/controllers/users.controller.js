const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

// Importacion de libreria para autoimportaciones de VsCode
// Renombrado de response para utilizar ayuda IDE
const usersGet = async (req = request, res = response) => {
  const { limit = 3, from = 0 } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).limit(Number(limit)).skip(Number(from)),
  ]);

  res.json({ total, users });
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

const usersDelete = async (req, res = response) => {
  const { id } = req.params;

  // Borrado total--> const user = await User.findByIdAndDelete(id);

  // Borrado por estado
  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json({
    user,
  });
};

module.exports = { usersGet, usersPost, usersPut, usersPatch, usersDelete };
