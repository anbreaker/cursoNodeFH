'use strict';
const fs = require('fs');

const crearArchivo = async (base = 1) => {
  try {
    console.log('\n==================');
    console.log('   Tabla del: ', base);
    console.log('==================');

    let data = '';

    for (let i = 0; i < 10; i++) {
      data += `${base} * ${i} = ${base * i}\n`;
    }

    console.log(data);

    fs.writeFileSync(`multiplyAsync/tablas/tabla-${base}.txt`, data);

    return `tabla-${base}.txt CREADA`;
  } catch (error) {
    throw error;
  }
};

module.exports = { crearArchivo };
