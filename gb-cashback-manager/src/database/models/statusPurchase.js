import pkg from 'sequelize';
import database from '../database.js';

const { DataTypes } = pkg;

const statusPurchase = database.define('STATUS_PURCHASE', {
    idStatus: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    statusName: {
        type: DataTypes.TEXT,
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

export default statusPurchase;
