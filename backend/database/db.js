import { Sequelize } from 'sequelize';
import fs from 'fs';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD, {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      dialect: 'mysql',
      dialectOptions: {
         ssl: {
            require: true,
            ca: fs.readFileSync("./ca.pem").toString(),
         }
    }
   }
);
sequelize.sync().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

export default sequelize;