require('colors');

const { inquirerMenu, pause } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {
  console.log('Hola Mundo');

  let opt = '';

  do {
    opt = await inquirerMenu();
    console.log({ opt });

    await pause();
  } while (opt !== '7');
};

main();
