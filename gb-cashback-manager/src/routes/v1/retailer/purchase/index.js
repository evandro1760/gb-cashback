import { Router } from 'express';

import listRouter from './list.js';

const postPurchase = async (request, response, next) => {
    try {
        return response.status(200).json({
            message: 'ok',
        });
    } catch (error) {
        return next(error);
    }
};

const router = Router();
router.use('/list', listRouter);
router.post('/', postPurchase);

export default router;
