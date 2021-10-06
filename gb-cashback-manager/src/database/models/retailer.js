import pkg from 'sequelize';
import database from '../database.js';

const { DataTypes } = pkg;

const retailer = database.define('RETAILER', {
    idRetailer: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    hashedPassword: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    previousCashbackBalance: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

export default retailer;
