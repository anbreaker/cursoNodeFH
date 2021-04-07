require('colors');

const { inquirerMenu, pause, readInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {
  console.log('Hola Mundo');

  let opt = '';
  const tareas = new Tareas();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        //opt
        const description = await readInput('Descripcion:');

        tareas.crearTarea(description);

        break;
      case '2':
        console.log(tareas._listado);

        break;
    }

    await pause();
  } while (opt !== '7');
};

main();
