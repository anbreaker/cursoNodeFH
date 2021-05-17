const { Socket } = require('socket.io');

const { checkJWT } = require('../helpers/generateJWT');
const ChatSms = require('../models/chatSms.models');

const chatSms = new ChatSms();

// TODO delete before production Import for VsCode help
const socketController = async (socket = new Socket(), io) => {
  //
  const token = socket.handshake.headers.bearer;
  const user = await checkJWT(token);

  if (!user) return socket.disconnect();

  // console.log('User connect:', user.name);

  // Add user connect
  chatSms.connectUser(user);
  io.emit('active-users', chatSms.usersArray);

  // Delete user Offline
  socket.on('disconnect', () => {
    chatSms.disconnectUser(user.id);
    io.emit('active-users', chatSms.usersArray);
  });
};

module.exports = { socketController };
