import { Sequelize } from 'sequelize-typescript';
import { ProductoModel } from '../model/productoModel';

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USER,
  models: [ProductoModel],
});

export { sequelize };