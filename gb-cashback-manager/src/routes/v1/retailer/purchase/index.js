import { Router } from 'express';
import createError from 'http-errors';

import listRouter from './list.js';
import retailer from '../../../../database/models/retailer.js';
import autoStatusPurchaseEvents from '../../../../database/models/autoStatusPurchaseEvents.js';
import purchase from '../../../../database/models/purchase.js';
import statusPurchaseEvents from '../../../../database/models/statusPurchaseEvents.js';
import PostPurchase from '../../../../requests/PostPurchase.js';

const postPurchase = async (req, res, next) => {
    try {
        const request = new PostPurchase(req);
        let idStatus = 1;
        const keyMapping = { targetKey: 'cpf', foreignKey: 'cpf' };

        retailer.hasOne(autoStatusPurchaseEvents, keyMapping);
        autoStatusPurchaseEvents.belongsTo(retailer, keyMapping);

        const autoStatusPurchase = await autoStatusPurchaseEvents.findOne({
            attributes: ['cpf', 'idStatus'],
            include: [{
                model: retailer,
                required: true,
                where: { idRetailer: request.idRetailer },
                attributes: [],
            }],
            raw: true,
        });
        if (autoStatusPurchase) {
            idStatus = autoStatusPurchase.idStatus;
        }
        const insertedPurchase = await purchase.create({
            code: request.code,
            amount: request.amount,
            date: request.date,
            idRetailer: request.idRetailer,
        }).catch((error) => {
            if (error.errors[0].type === 'unique violation') {
                throw createError(409, 'Already exists a purchase with the same code');
            }
            throw error;
        });
        await statusPurchaseEvents.create({
            idPurchase: insertedPurchase.toJSON().idPurchase,
            idStatus,
        });
        return res.status(201).json({
            message: 'Successfully registered purchase',
            timestamp: request.timestamp,
        });
    } catch (error) {
        return next(error);
    }
};

const router = Router();
router.use('/list', listRouter);
router.post('/', postPurchase);

export default router;
