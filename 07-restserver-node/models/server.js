const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // API users
    this.usersRoutesPath = '/api/users';

    // Middlewares
    this.middlewares();

    // Rutas de la Aplicacion

    this.routes();
  }

  middlewares() {
    // cors to use Access-Control-Allow-Origin (Browsers)
    this.app.use(cors());

    // Directorio ficheros Estaticos
    this.app.use(express.static('public'));
  }

  routes() {
    // Config Patch to route!!
    this.app.use(this.usersRoutesPath, require('../routes/users.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
