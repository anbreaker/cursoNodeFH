const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Config SocketIO
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);

    // API users
    this.authRoutesPath = '/api/auth';

    // Middlewares
    this.middlewares();

    // Rutas de la Aplicacion
    this.routes();

    // Sockets Configuration
    this.sockets();
  }

  middlewares() {
    // cors to use Access-Control-Allow-Origin (Browsers)
    this.app.use(cors());

    // Form sends data, understand it, but not accept images etc...(Method of Express)
    this.app.use(express.urlencoded({ extended: true }));

    // Https views
    this.app.use(morgan('dev'));

    // Directorio ficheros Estaticos
    this.app.use(express.static('public'));
  }

  routes() {
    // Config Path to route!!
    // this.app.use(this.authRoutesPath, require('../routes/auth.routes'));
  }

  sockets() {
    this.io.on('connection', (socket) => {
      console.log('Client Logged in!', socket.id);

      socket.on('disconnect', () => console.log('Client Disconnected', socket.id));
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      // visit http://localhost:3000/socket.io/socket.io.js
      // SocketIO run!
      console.log(`Example SocketIO app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
