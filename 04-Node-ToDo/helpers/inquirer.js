const inquirer = require('inquirer');
require('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: '¿Qué dese hacer?',
    choices: [
      { value: '1', name: `${'1.'.green} Crear Tarea` },
      { value: '2', name: `${'2.'.green} Listar Tareas` },
      { value: '3', name: `${'3.'.green} Listar Tareas Completadas` },
      { value: '4', name: `${'4.'.green} Listar Tareas Pendientes` },
      { value: '5', name: `${'5.'.green} Completar Tarea(s)` },
      { value: '6', name: `${'6.'.green} Crear Tarea` },
      { value: '7', name: `${'7.'.green} ${'Salir'.yellow}` },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('======================='.green);
  console.log(' Seleccione una opción'.yellow);
  console.log('=======================\n'.green);

  const { option } = await inquirer.prompt(questions);
  return option;
};

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'Enter'.green} para continuar.`,
    },
  ];
  console.log('\n');

  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'description',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      },
    },
  ];

  const { description } = await inquirer.prompt(question);
  return description;
};

module.exports = { inquirerMenu, pause, readInput };
