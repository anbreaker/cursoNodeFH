import express, { Application } from 'express';
import cors from 'cors';

import userRoutes from '../routes/user.routes';
import db from '../database/db.connections';

export class Server {
  private app: Application;
  private port: String;
  private apiPath = {
    users: '/api/users',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';

    //Connect DataBase
    this.dbConnection();

    // Middlewares
    this.middlewares();

    // Routes (Remember! this function last on constructor XD)
    this.routes();
  }

  // Connect DataBase
  async dbConnection() {
    try {
      await db.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      // throw new Error(error);
    }
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // Parseo Body
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.apiPath.users, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app on TS listening at http://localhost:${this.port}`);
    });
  }
}
