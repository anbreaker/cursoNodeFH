const socket = io();

const params = new URLSearchParams(window.location.search);

if (!params.has('name')) {
  window.location = 'index.html';
  throw new Error('El nombre es necesario');
}

const user = {
  name: params.get('name'),
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
socket.emit(
  'enviarMensaje',
  {
    usuario: 'anbreaker',
    mensaje: 'Hola Mundo',
  },
  function (resp) {
    console.log('respuesta server: ', resp);
  }
);

// Escuchar información
socket.on('crearMensaje', (mensaje) => {
  console.log('Servidor:', mensaje, '<----');
});
