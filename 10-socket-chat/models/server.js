const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const { createServer } = require('http');

const { dbConnection } = require('../database/mongoose.config');
const { socketController } = require('../sockets/socketController');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Config socketIO
    this.serverSocketIO = createServer(this.app);
    this.io = require('socket.io')(this.serverSocketIO);

    // API users
    this.authRoutesPath = '/api/auth';
    this.usersRoutesPath = '/api/users';
    this.searchRoutesPath = '/api/search';
    this.uploadsRoutesPath = '/api/uploads';
    this.productsRoutesPath = '/api/products';
    this.categoriesRoutesPath = '/api/categories';

    // Connect to Database
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Rutas de la Aplicacion

    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // cors to use Access-Control-Allow-Origin (Browsers)
    this.app.use(cors());

    // Read Express Data
    this.app.use(express.json());

    // Form sends data, understand it, but not accept images etc...(Method of Express)
    this.app.use(express.urlencoded({ extended: true }));

    // Https views
    // this.app.use(morgan('dev'));

    // Directorio ficheros Estaticos
    this.app.use(express.static('public'));

    // FileUplaad
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true, // To create Folder automatic
      })
    );

    // Sockets
    this.sockets();
  }

  routes() {
    // Config Path to route!!
    this.app.use(this.authRoutesPath, require('../routes/auth.routes'));
    this.app.use(this.usersRoutesPath, require('../routes/users.routes'));
    this.app.use(this.searchRoutesPath, require('../routes/search.routes'));
    this.app.use(this.uploadsRoutesPath, require('../routes/uploads.routes'));
    this.app.use(this.productsRoutesPath, require('../routes/products.routes'));
    this.app.use(this.categoriesRoutesPath, require('../routes/categories.routes'));
  }

  sockets() {
    this.io.on('connection', (socket) => socketController(socket, this.io));
  }

  listen() {
    // Server listen --> express
    // Server listen sockectIO --> serverSocketIO
    this.serverSocketIO.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
