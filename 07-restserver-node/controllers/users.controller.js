const { response } = require('express');

// Importacion de libreria para autoimportaciones de VsCode
// Renombrado de response para utilizar ayuda IDE
const usersGet = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'get API - controller',
  });
};

const usersPost = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'post API - controller',
  });
};

const usersPut = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'put API - Controller',
  });
};

const usersPatch = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'patch API - Controller',
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'delete API - Controller',
  });
};

module.exports = { usersGet, usersPost, usersPut, usersPatch, usersDelete };
