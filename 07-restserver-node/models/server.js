const express = require('express');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Middlewares
    this.middlewares();

    // Rutas de la Aplicacion

    this.routes();
  }

  middlewares() {
    // Directorio ficheros Estaticos
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.get('/hola', (req, res) => {
      res.render('Hola Mundo!');
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
