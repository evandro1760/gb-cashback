import pkg from 'sequelize';
import database from '../database.js';

const { DataTypes } = pkg;

const purchase = database.define('PURCHASE', {
    idPurchase: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    code: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    idRetailer: {
        type: DataTypes.BIGINT,
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

export default purchase;
