const socketController = (socket) => {
  console.log('Client Logged in!', socket.id);

  socket.on('disconnect', () => console.log('Client Disconnected', socket.id));

  socket.on('send-sms', (payload, callback) => {
    const id = 12345645;

    callback(id);

    socket.broadcast.emit('send-sms', payload);
  });
};

module.exports = { socketController };
