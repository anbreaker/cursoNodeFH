import express, { Application } from 'express';

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

    // Routes
    this.routes();
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
