require('dotenv').config();

const Server = require('./models/server');

const server = new Server();

// Up Server and listen
server.listen();
