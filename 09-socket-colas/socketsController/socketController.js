const socketController = (socket) => {
  socket.on('send-sms', (payload, callback) => {
    const id = 12345645;

    callback(id);

    socket.broadcast.emit('send-sms', payload);
  });
};

module.exports = { socketController };
