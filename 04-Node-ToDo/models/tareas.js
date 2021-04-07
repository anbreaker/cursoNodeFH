const { v4: uuidv4 } = require('uuid');

/**
 * _ listado:
 *    {1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' : {id:12}, desc:asc, completadoEn:07-04-21}},
 */
class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }
}

module.exports = Tareas;
