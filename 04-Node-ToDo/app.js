require('colors');

const { inquirerMenu, pause, readInput } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/interactionDataBase');
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
    }

    saveDB(tareas.listadoArray);

    await pause();
  } while (opt !== '7');
};

main();
