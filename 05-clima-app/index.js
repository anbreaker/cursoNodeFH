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

        if (id === '0') continue;

        const { nombre, lat, lng } = lugares.find((lugar) => lugar.id === id);

        // Guardar en DB
        searchs.addHistory(nombre);

        // Datos Clima
        const clima = await searchs.climaLugar(lat, lng);
        const { minT, maxT, description } = clima;

        // Mostrar Resultado
        console.clear();
        console.log('\nInformación del Lugar\n'.green);
        console.log('Ciudad:', nombre.green);
        console.log('Latitud:', lat);
        console.log('Longitud:', lng);
        console.log('Temperatura:');
        console.log('Mínima:', minT); //clima.minT
        console.log('Máxima:', maxT); //clima.maxT
        console.log('El Clima en este momento:', description.toUpperCase().blue); //clima.description

        break;
      case 2:
        searchs.history.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        });

        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 3);
};

main();
