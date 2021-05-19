import express, { Application } from 'express';
import cors from 'cors';

import userRoutes from '../routes/user.routes';

export class Server {
  private app: Application;
  private port: String;
  private apiPath = {
    users: '/api/users',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';

    // Middlewares
    this.middlewares();

    // Routes (Remember! this function last on constructor XD)
    this.routes();
  }

  // TODO: Connect DataBase

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
