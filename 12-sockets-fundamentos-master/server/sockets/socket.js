const { io } = require('../server');

const { Users } = require('../classes/users');

const users = new Users();

io.on('connection', (client) => {
  client.on('entrarChat', (data, callback) => {
    if (!data.name) {
      return callback({
        error: true,
        mensaje: 'El nombre/sala es necesario',
      });
    }

    const persons = users.addPerson(client.id, data.name);

    callback(persons);
  });

  client.on('disconnect', () => {
    const ver = users.getPerson(client.id);
    const deletePerson = users.deletePerson(client.id);

    console.log({ ver });

    client.broadcast.emit('crearMensaje', {
      usuario: 'Admin',
      mensaje: `${deletePerson.name} Abandono el chat`,
    });
  });
});
