const socket = io();

const params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('sala')) {
  window.location = 'index.html';
  throw new Error('El nombre y sala son necesarios');
}

const user = {
  name: params.get('name'),
  sala: params.get('sala'),
};

socket.on('connect', function () {
  console.log('Conectado al servidor');

  socket.emit('entrarChat', user, (response) => {
    console.log('Usuarios conectados', response);
  });
});

// escuchar
socket.on('disconnect', function () {
  console.log('Perdimos conexión con el servidor');
});

// Enviar información
// socket.emit(
//   'crearMensaje',
//   {
//     usuario: 'anbreaker',
//     mensaje: 'Hola Mundo',
//   },
//   function (resp) {
//     console.log('respuesta server: ', resp);
//   }
// );

// Escuchar información
socket.on('crearMensaje', (mensaje) => {
  console.log('Servidor:', mensaje);
});

// Escuchar cambios de usuarios
socket.on('listaPersona', (personas) => {
  console.log(personas);
});

// Mensaje Privado
socket.on('mensajePrivado', (mensaje) => {
  console.log({ 'Mensaje Privado': mensaje });
});
