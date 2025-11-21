import { Sequelize } from 'sequelize-typescript';
import { ClienteModel } from '../models/clienteModel';

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'mysql',
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USER,
  models: [ClienteModel],
});



export { sequelize };