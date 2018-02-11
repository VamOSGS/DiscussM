import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ silent: process.env.NODE_ENV === 'production' });
const { DB_USER, DB_USER_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_USER_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
);

export default { sequelize };
