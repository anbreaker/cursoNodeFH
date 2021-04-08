require('colors');

const { readInput } = require('./helpers/inquirer');
const { inquirerMenu, pause } = require('./helpers/inquirer');
const Searchs = require('./models/searchs');

console.clear();

const main = async () => {
  let opt;

  const searchs = new Searchs();

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        // Mostrar mensaje
        const lugar = await readInput('Ciudad: ');
        await searchs.city(lugar);

        // buscar Lugares

        //Seleccionar el lugar

        // Datos Clima

        // Mostrar Resultado
        console.log('\nInformación del Lugar\n'.green);
        console.log('Ciudad:');
        console.log('Latitud:');
        console.log('Longitud:');
        console.log('Temperatura:');
        console.log('Mínima:');
        console.log('Máxima:');

        break;
      case 2:
        break;
      case 3:
        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 3);
};

main();
