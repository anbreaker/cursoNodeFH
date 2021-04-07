'use strict';
const fs = require('fs');
const colors = require('colors');

const crearArchivo = async (base = 1, listar) => {
  try {
    console.log(colors.green('\n==================='));
    console.log('   Tabla del: ', colors.yellow(base));
    console.log(colors.green('==================='));

    let data = '';

    for (let i = 0; i < 10; i++) {
      data += `   ${base} ${'x'.blue} ${i} ${'='.blue} ${base * i}\n`;
    }

    if (listar) console.log(data);

    fs.writeFileSync(`tablas/tabla-${base}.txt`, data);

    return `tabla-${base}.txt CREADA`;
  } catch (error) {
    throw error;
  }
};

module.exports = { crearArchivo };
