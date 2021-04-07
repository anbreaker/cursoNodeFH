require('colors');

const { mostrarMenu, pausa } = require('./helpers/mensajes');

console.clear();

const main = async () => {
  console.log('Hola Mundo');
  // pausa();

  let opt = '';

  do {
    opt = await mostrarMenu();
    console.log({ opt });

    if (opt !== '7') await pausa();
  } while (opt !== '7');
};

main();
