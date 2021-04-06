'use strict';
const { crearArchivo } = require('./multiplicar');

// Ejecutar este app --base=5
// node app.js
console.clear();

// console.log(process.argv);
const [, , argumento3 = 'base=1'] = process.argv;
const parametro = argumento3;
const base = parametro.split('=')[1];

console.log(`
-----------------------------------
\tTabla del numero ${base}
-----------------------------------
`);

crearArchivo(base)
  .then((archivo) => console.log(`Archivo creado: ${archivo}`))
  .catch((error) => console.log(error));
