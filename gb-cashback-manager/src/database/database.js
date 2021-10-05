import pkg from 'sequelize';

const { Sequelize } = pkg;

const database = new Sequelize(
    'GB-CASHBACK',
    'root',
    '1234',
    {
        dialect: 'mysql',
        logging: false,
        host: 'localhost',
        port: 3306,
        define: {
            freezeTableName: true,
        },
    },
);

export default database;
