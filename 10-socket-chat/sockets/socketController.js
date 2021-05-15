const { Socket } = require('socket.io');

const { checkJWT } = require('../helpers/generateJWT');

// TODO delete before production Import for VsCode help
const socketController = async (socket = new Socket()) => {
  //
  const token = socket.handshake.headers.bearer;
  const user = await checkJWT(token);

  if (!user) return socket.disconnect();

  console.log('User connect:', user.name);
};

module.exports = { socketController };
