const { v4: uuidv4 } = require('uuid');
const Tarea = require('./tarea');

/**
 * _ listado:
 *    {1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' : {id:12}, desc:asc, completadoEn:07-04-21}},
 */
class Tareas {
  _listado = {};

  get listadoArray() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  deleteTask(id = '') {
    if (this._listado[id]) delete this._listado[id];
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });

    return null;
  }

  crearTarea(description = '') {
    const tarea = new Tarea(description);

    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();

    this.listadoArray.forEach((tarea, index) => {
      index = `${index + 1}`.blue;

      const { description, completadoEn } = tarea;

      const estado = completadoEn ? 'Compeltada'.green : 'Pendiente'.red;

      console.log(`${index}. ${description} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    let contador = 0;

    this.listadoArray.forEach((tarea) => {
      const { description, completadoEn } = tarea;

      const estado = completadoEn ? 'Compeltada'.green : 'Pendiente'.red;

      if (completadas) {
        if (completadoEn) {
          contador += 1;
          console.log(
            `${(contador + '.').green} ${description} :: ${completadoEn.green}`
          );
        }
      } else {
        if (!completadoEn) {
          contador += 1;
          console.log(`${(contador + '.').red} ${description} :: ${estado}`);
        }
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];

      if (!tarea.completadoEn) tarea.completadoEn = new Date().toISOString();
    });

    this.listadoArray.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
