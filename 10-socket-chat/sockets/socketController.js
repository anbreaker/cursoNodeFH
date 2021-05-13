const { Socket } = require('socket.io');

// TODO delete before production Import for VsCode help
const socketController = async (socket = new Socket()) => {
  console.log('Cliente Conectado', socket.id);
};

module.exports = { socketController };
