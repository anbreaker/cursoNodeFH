import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Config dotenv
dotenv.config();

const db = new Sequelize('NodeSQL', 'anbreaker', process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql',
  // logging:false
});

export default db;
