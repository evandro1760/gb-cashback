import pkg from 'sequelize';
import database from '../database.js';

const { DataTypes } = pkg;

const statusPurchaseEvents = database.define('STATUS_PURCHASE_EVENTS', {
    idStatusEvent: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    idPurchase: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    idStatus: {
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

export default statusPurchaseEvents;
