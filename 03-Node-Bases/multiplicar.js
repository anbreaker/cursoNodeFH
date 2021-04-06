const fs = require('fs');

const crearArchivo = (base) => {
  return new Promise((resolve, reject) => {
    if (!Number(base)) {
      reject(`El valor introducido --' ${base} '--, ha de ser un Número`);
      return;
    }

    let data = '';

    for (let i = 1; i <= 10; i++) {
      data += `${base} * ${i} = ${base * i}\n`;
    }

    fs.writeFile(`tablas/tabla-${base}.txt`, data, (error) => {
      if (error) reject(error);
      else resolve(`tabla-${base}.txt`);
    });
  });
};

module.exports = { crearArchivo };
