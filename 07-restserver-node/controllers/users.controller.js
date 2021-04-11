const { response, request } = require('express');

// Importacion de libreria para autoimportaciones de VsCode
// Renombrado de response para utilizar ayuda IDE
const usersGet = (req = request, res = response) => {
  const { query, nombre = 'not name', apikey, page, limit = 5 } = req.query;

  res.json({
    msg: 'get API - controller',
    query,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usersPost = (req, res = response) => {
  const { nombre, edad } = req.body;

  res.json({
    msg: 'post API - controller',
    nombre,
    edad,
  });
};

const usersPut = (req, res = response) => {
  const { id } = req.params;

  res.json({
    msg: 'put API - Controller',
    id,
  });
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
