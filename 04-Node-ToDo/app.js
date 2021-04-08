require('colors');

const { saveDB, readDB } = require('./helpers/interactionDataBase');
const {
  inquirerMenu,
  pause,
  readInput,
  listadoDeleteTask,
  confirm,
  mostrarListadoChecklist,
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {
  let opt = '';
  const tareas = new Tareas();

  const tareasDB = readDB();

  if (tareasDB) tareas.cargarTareasFromArray(tareasDB);

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        const description = await readInput('Descripcion:');
        tareas.crearTarea(description);
        break;
      case '2':
        tareas.listadoCompleto(tareas.listadoArray);
        break;
      case '3':
        tareas.listarPendientesCompletadas();
        break;
      case '4':
        tareas.listarPendientesCompletadas(false);
        break;
      case '5':
        const ids = await mostrarListadoChecklist(tareas.listadoArray);
        tareas.toggleCompletadas(ids);

        break;
      case '6':
        // Borrar
        const id = await listadoDeleteTask(tareas.listadoArray);

        if (id !== '0') {
          const confirmDelete = await confirm('¿Estas seguro de Eliminar la tarea?');

          if (confirmDelete) tareas.deleteTask(id);
          console.log('Tarea Eliminada correctamente'.blue);
        }

        break;
    }

    saveDB(tareas.listadoArray);

    await pause();
  } while (opt !== '7');
};

main();
