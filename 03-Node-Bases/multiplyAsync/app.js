const { crearArchivo } = require('./utils/multiply');

console.clear();

const base = 3;

crearArchivo(base)
  .then((nombreArchivo) => console.log(nombreArchivo, 'creado'))
  .catch((err) => console.log(err));
