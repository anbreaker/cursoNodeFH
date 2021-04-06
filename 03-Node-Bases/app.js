'use strict';
const { crearArchivo } = require('./multiplicar');

console.clear();

// console.log(process.argv);
const argv = process.argv;
const parametro = argv[2];
const base = parametro.split('=')[1];

console.log(`
-----------------------------------
\tTabla del numero ${base}
-----------------------------------
`);

console.log(base);

crearArchivo(base)
  .then((archivo) => console.log(`Archivo creado: ${archivo}`))
  .catch((error) => console.log(error));
