const { resolve } = require('path');

require('colors');

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log('======================='.green);
    console.log(' Seleccione una opción'.yellow);
    console.log('=======================\n'.green);

    console.log(`${'1.'.green} Crear Tarea`);
    console.log(`${'2.'.green} Listar Tareas`);
    console.log(`${'3.'.green} Listar Tareas Completadas`);
    console.log(`${'4.'.green} Listar Tareas Pendientes`);
    console.log(`${'5.'.green} Completar Tarea(s)`);
    console.log(`${'6.'.green} Crear Tarea`);
    console.log(`${'7.'.green} ${'Salir'.yellow}\n`);

    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question('Selecione una opcion: ', (opt) => {
      readLine.close();

      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question(`\nPresione ${'ENTER'.green} para conitnuar: \n`, () => {
      readLine.close();
      resolve();
    });
  });
};

module.exports = { mostrarMenu, pausa };
