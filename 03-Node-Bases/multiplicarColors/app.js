const { crearArchivo } = require('./utils/multiply');
const { argv } = require('./config/yargsConfig');
require('colors');

console.clear();

// console.log(argv);

crearArchivo(argv.base, argv.listar, argv.hasta)
  .then((nombreArchivo) => console.log(nombreArchivo.yellow))
  .catch((err) => console.log(err));
