import { Router } from 'express';
import createError from 'http-errors';

import retailer from '../../../../database/models/retailer.js';
import purchase from '../../../../database/models/purchase.js';
import statusPurchaseEvents from '../../../../database/models/statusPurchaseEvents.js';
import statusPurchase from '../../../../database/models/statusPurchase.js';
import { cashbackPercentage } from '../../../../components/utils.js';

const getCashbackBalance = async (request, response, next) => {
    try {
        const { idRetailer } = request.session;
        let accumulatedBalance = 0;
        const user = await retailer.findOne({
            where: {
                idRetailer,
            },
            raw: true,
        });
        if (!user) {
            throw createError(401, 'Access token is invalid or expired');
        }
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

        if (purchaseEvents.length) {
            const purchases = [];
            const purchasesIdentifiers = [];
            const sumByMonth = {};
            purchaseEvents.forEach((purchaseItem) => {
                if (!purchasesIdentifiers.includes(purchaseItem.idPurchase)) {
                    purchasesIdentifiers.push(purchaseItem.idPurchase);
                    const monthCode = purchaseItem['PURCHASE.date'].split('-').slice(0, 2).join('');
                    const amount = purchaseItem['PURCHASE.amount'];
                    sumByMonth[monthCode] = (sumByMonth[monthCode] || 0) + amount;
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
            accumulatedBalance = purchases.reduce(
                (acc, element) => acc + element.cashback.amount, 0,
            );
        }
        return response.status(200).json({
            accumulatedBalance,
            previousBalance: user.previousCashbackBalance,
            totalBalance: user.previousCashbackBalance + accumulatedBalance,
        });
    } catch (error) {
        return next(error);
    }
};

const router = Router();
router.get('/', getCashbackBalance);

export default router;
