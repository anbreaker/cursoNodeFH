const { v4: uuidv4 } = require('uuid');
const Tarea = require('./tarea');

/**
 * _ listado:
 *    {1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' : {id:12}, desc:asc, completadoEn:07-04-21}},
 */
class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  crearTarea(description = '') {
    const tarea = new Tarea(description);

    this._listado[tarea.id] = tarea;
  }
}

module.exports = Tareas;
