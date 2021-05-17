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
  socket.emit('recived-sms', chatSms.last10);

  // Connect private Chat
  socket.join(user.id); //Global, socket.id, user.id

  // Delete user Offline
  socket.on('disconnect', () => {
    chatSms.disconnectUser(user.id);
    io.emit('active-users', chatSms.usersArray);
  });

  socket.on('send-sms', ({ uid, sms }) => {
    if (uid) {
      // Private sms
      socket.to(uid).emit('private-sms', { de: user.name, sms });
    } else {
      chatSms.sendSms(user.id, user.name, sms);

      io.emit('recived-sms', chatSms.last10);
    }
  });
};

module.exports = { socketController };
