import { Router } from 'express';
import createError from 'http-errors';

import purchase from '../../../../database/models/purchase.js';
import statusPurchaseEvents from '../../../../database/models/statusPurchaseEvents.js';
import statusPurchase from '../../../../database/models/statusPurchase.js';
import { cashbackPercentage } from '../../../../components/utils.js';

const getPurchasesList = async (req, response, next) => {
    try {
        const { idRetailer } = req.session;
        const keyMapping = [
            { targetKey: 'idPurchase', foreignKey: 'idPurchase' },
            { targetKey: 'idStatus', foreignKey: 'idStatus' },
        ];

        statusPurchaseEvents.belongsTo(purchase, keyMapping[0]);
        statusPurchaseEvents.belongsTo(statusPurchase, keyMapping[1]);
        statusPurchase.hasOne(statusPurchaseEvents, keyMapping[1]);
        purchase.hasOne(statusPurchaseEvents, keyMapping[0]);

        const purchaseEvents = await statusPurchaseEvents.findAll({
            include: [
                {
                    model: purchase,
                    required: true,
                    where: {
                        idRetailer,
                    },
                },
                {
                    model: statusPurchase,
                    required: true,
                },
            ],
            order: [
                ['createdAt', 'DESC'],
            ],
            raw: true,
        });

        if (!purchaseEvents.length) {
            throw createError(404, 'Not found registered purchases for the retailer');
        }

        const purchases = [];
        const purchasesIdentifiers = [];
        const sumByMonth = {};
        purchaseEvents.forEach((purchaseItem) => {
            if (!purchasesIdentifiers.includes(purchaseItem.idPurchase)) {
                purchasesIdentifiers.push(purchaseItem.idPurchase);
                const monthCode = purchaseItem['PURCHASE.date'].split('-').slice(0, 2).join('');
                const amount = purchaseItem['PURCHASE.amount'];
                sumByMonth[monthCode] = (sumByMonth[monthCode] || 0) + purchaseItem['PURCHASE.amount'];
                purchases.push({
                    code: purchaseItem['PURCHASE.code'],
                    amount,
                    date: purchaseItem['PURCHASE.date'],
                    purchaseStatus: purchaseItem['STATUS_PURCHASE.statusName'],
                    cashback: {
                        percentage: 0,
                        amount: 0,
                    },
                });
            }
        });
        Object.keys(sumByMonth).forEach((month) => {
            sumByMonth[month] = cashbackPercentage(sumByMonth[month]);
        });
        purchases.map((element) => {
            const currentPurchase = { ...element };
            currentPurchase.cashback.percentage = sumByMonth[element.date.split('-').slice(0, 2).join('')];
            currentPurchase.cashback.amount = Number((
                element.amount * currentPurchase.cashback.percentage
            ).toFixed(2));
            return currentPurchase;
        });
        purchases.sort((first, second) => (new Date(second.date)) - (new Date(first.date)));
        return response.status(200).json({ purchases });
    } catch (error) {
        return next(error);
    }
};

const router = Router();
router.get('/', getPurchasesList);

export default router;
