const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // API users
    this.authRoutesPath = '/api/auth';

    // Middlewares
    this.middlewares();

    // Rutas de la Aplicacion

    this.routes();
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

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
