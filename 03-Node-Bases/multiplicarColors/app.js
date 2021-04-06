const { boolean } = require('yargs');
const { crearArchivo } = require('./utils/multiply');

const argv = require('yargs')
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
  })
  .option('l', {
    alias: 'listar',
    type: 'boolean',
    demandOption: true,
    default: false,
  })
  .check((argv, options) => {
    if (isNaN(argv.base)) throw 'La base ha de ser un número';
    return true;
  }).argv;

console.clear();

// console.log(argv);

crearArchivo(argv.base, argv.listar)
  .then((nombreArchivo) => console.log(nombreArchivo, 'creado'))
  .catch((err) => console.log(err));
