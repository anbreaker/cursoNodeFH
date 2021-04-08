const inquirer = require('inquirer');
require('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: '¿Qué dese hacer?',
    choices: [
      { value: 1, name: `${'1.'.green} Buscar Ciudad Tarea` },
      { value: 2, name: `${'2.'.green} Historial` },
      { value: 3, name: `${'3.'.green} ${'Salir'.yellow}` },
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

const listadoDeleteTask = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.description}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0. '.green + 'Cancelar',
  });

  const questions = {
    type: 'list',
    name: 'id',
    message: 'Borrar',
    choices,
  };

  const { id } = await inquirer.prompt(questions);
  return id;
};

console.log();
const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.description}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const question = {
    type: 'checkbox',
    name: 'ids',
    message: 'Selecciones',
    choices,
  };

  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listadoDeleteTask,
  confirm,
  mostrarListadoChecklist,
};
