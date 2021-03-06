const { response, request } = require('express');

const encryptPass = require('../helpers/bcryptjs');

const User = require('../models/user.model');

// Importacion de libreria para autoimportaciones de VsCode
// Renombrado de response para utilizar ayuda IDE
const usersGet = async (req = request, res = response) => {
  const { limit = 3, from = 0 } = req.query;
  const query = { status: true };

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
  user.password = encryptPass(password);

  // Save on DB instance of User with data
  await user.save();

  res.json({
    msg: 'post API - controller',
    user,
  });
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;

  const { uid, password, google, ...restParams } = req.body;

  // TODO validar contra base de datos

  // Encriptar pass
  if (password) restParams.password = encryptPass(password);

  const user = await User.findByIdAndUpdate(id, restParams, {
    returnOriginal: false,
  });

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
  const user = await User.findByIdAndUpdate(
    id,
    { status: false },
    { returnOriginal: false } // Para ver el dato actual en postman
  );

  res.json({ user });
};

module.exports = { usersGet, usersPost, usersPut, usersPatch, usersDelete };
