import { Router } from 'express';

const postSignUp = async (request, response, next) => {
    try {
        return response.status(200).json({
            message: 'ok',
        });
    } catch (error) {
        return next(error);
    }
};

const router = Router();
router.post('/', postSignUp);

export default router;
