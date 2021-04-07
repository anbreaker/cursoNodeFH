const argv = require('yargs')
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Es la base de la tabla de multiplicar',
  })
  .option('h', {
    alias: 'hasta',
    type: 'number',
    default: 10,
    describe: 'Muestra la tabla hasta el numero indicado',
  })
  .option('l', {
    alias: 'listar',
    type: 'boolean',
    default: false,
    describe: 'Muestra la tabla en consola',
  })
  .check((argv, options) => {
    if (isNaN(argv.base)) throw 'La base ha de ser un número';
    return true;
  }).argv;

module.exports = { argv };
