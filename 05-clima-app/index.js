const { readInput } = require('./helpers/inquirer');

const main = async () => {
  const texto = await readInput('Hola: ');
  console.log(texto);
};

main();
