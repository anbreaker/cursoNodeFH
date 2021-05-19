const { io } = require('../server');

const { Users } = require('../classes/users');
const { crearMensaje } = require('../utils/utils');

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

    client.broadcast.emit('listaPersona', users.getPersons());

    callback(persons);
  });

  client.on('crearMensaje', (data) => {
    const persona = users.getPerson(client.id);

    const mensaje = crearMensaje(persona.name, data.mensaje);

    client.broadcast.emit('crearMensaje', mensaje);
  });

  client.on('disconnect', () => {
    const deletePerson = users.deletePerson(client.id);

    client.broadcast.emit('crearMensaje', {
      usuario: 'Admin',
      mensaje: crearMensaje('Admin', `${deletePerson.name} Abandono el chat`),
    });

    client.broadcast.emit('listaPersona', users.getPersons());
  });

  // Mensajes Privados
  client.on('mensajePrivado', (data) => {
    const persona = users.getPerson(client.id);

    client.broadcast
      .to(data.para)
      .emit('mensajePrivado', crearMensaje(persona.name, data.mensaje));
  });
});
