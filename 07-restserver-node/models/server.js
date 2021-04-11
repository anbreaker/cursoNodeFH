const express = require('express');
const cors = require('cors');

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
    // cors to use Access-Control-Allow-Origin (Browsers)
    this.app.use(cors());

    // Directorio ficheros Estaticos
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.get('/api', (req, res) => {
      res.json({
        ok: true,
        msg: 'get API',
      });
    });

    this.app.put('/api', (req, res) => {
      res.status(400).json({
        ok: true,
        msg: 'put API',
      });
    });

    this.app.patch('/api', (req, res) => {
      res.json({
        ok: true,
        msg: 'patch API',
      });
    });

    this.app.post('/api', (req, res) => {
      res.status(201).json({
        ok: true,
        msg: 'post API',
      });
    });

    this.app.delete('/api', (req, res) => {
      res.json({
        ok: true,
        msg: 'delete API',
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
