require('colors');

const { readInput, listarLugares } = require('./helpers/inquirer');
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
        const ciudadBuscada = await readInput('Ciudad: ');

        // Buscar Lugares
        const lugares = await searchs.city(ciudadBuscada);

        // Seleccionar el lugar
        const id = await listarLugares(lugares);
        const { nombre, lat, lng } = lugares.find((lugar) => lugar.id === id);

        // Datos Clima

        // Mostrar Resultado
        console.log('\nInformación del Lugar\n'.green);
        console.log('Ciudad:', nombre);
        console.log('Latitud:', lat);
        console.log('Longitud:', lng);
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
