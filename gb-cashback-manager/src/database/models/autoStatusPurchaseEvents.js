import pkg from 'sequelize';
import database from '../database.js';

const { DataTypes } = pkg;

const autoStatusPurchaseEvents = database.define('AUTO_STATUS_PURCHASE_EVENTS', {
    cpf: {
        type: DataTypes.STRING(11),
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

export default autoStatusPurchaseEvents;
