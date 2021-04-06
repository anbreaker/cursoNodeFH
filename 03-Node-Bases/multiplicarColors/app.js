const { boolean } = require('yargs');
const { crearArchivo } = require('./utils/multiply');
const { argv } = require('./config/yargsConfig');

console.clear();

// console.log(argv);

crearArchivo(argv.base, argv.listar)
  .then((nombreArchivo) => console.log(nombreArchivo, 'creado'))
  .catch((err) => console.log(err));
