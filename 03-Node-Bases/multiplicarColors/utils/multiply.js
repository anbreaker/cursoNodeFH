'use strict';
const fs = require('fs');
const colors = require('colors');

const crearArchivo = async (base = 1, listar, hasta) => {
  try {
    console.log(colors.green('\n==================='));
    console.log('   Tabla del: ', colors.yellow(base));
    console.log(colors.green('==================='));

    let data = '';
    let terminal = '';

    for (let i = 1; i <= hasta; i++) {
      data += `   ${base} x ${i} = ${base * i}\n`;
      terminal += `   ${base} ${'x'.blue} ${i} ${'='.blue} ${base * i}\n`;
    }

    if (listar) console.log(terminal);

    fs.writeFileSync(`tablas/tabla-${base}.txt`, data);

    return `tabla-${base}.txt CREADA`;
  } catch (error) {
    throw error;
  }
};

module.exports = { crearArchivo };
