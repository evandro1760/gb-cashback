import { Router } from 'express';

const getPurchasesList = async (request, response, next) => {
    try {
        return response.status(200).json({
            message: 'ok',
        });
    } catch (error) {
        return next(error);
    }
};

const router = Router();
router.get('/', getPurchasesList);

export default router;
