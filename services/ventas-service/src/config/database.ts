import { Sequelize } from 'sequelize-typescript';
import { VentaModel, VentaItemModel } from '../models/Venta';

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'mysql',
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USER,
    models: [VentaItemModel, VentaModel],
});


export { sequelize};