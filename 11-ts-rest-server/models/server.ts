import express, { Application } from 'express';

export class Server {
  private app: Application;
  private port: String;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app on TS listening at http://localhost:${this.port}`);
    });
  }
}
