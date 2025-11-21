import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../model/productoModel';

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'mysql',
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USER,
  models: [ProductModel],
});

export default sequelize;