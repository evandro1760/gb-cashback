import sequelize from 'sequelize';
import { MYSQL } from '../config/env.js';

const database = new sequelize.Sequelize(
    MYSQL.DATABASE,
    MYSQL.USER,
    MYSQL.PASSWORD,
    {
        dialect: 'mysql',
        logging: MYSQL.LOGGING,
        host: MYSQL.HOST,
        port: MYSQL.PORT,
        define: {
            freezeTableName: true,
        },
    },
);

export default database;
