import { Router } from 'express';
import SHA256 from 'crypto-js/sha256.js';
import createError from 'http-errors';

import PostSignUpRequest from '../../../../requests/PostSignUpRequest.js';
import ExternalCashback from '../../../../services/ExternalCashback.js';
import retailer from '../../../../database/models/retailer.js';

const postSignUp = async (req, res, next) => {
    try {
        const request = new PostSignUpRequest(req);
        const hashedPassword = SHA256(request.password).toString();

        const externalCashbackResult = new ExternalCashback(request.log);
        const previousCashbackBalance = await externalCashbackResult
            .retailerCashbackCredit(request.cpf);

        await retailer.create({
            name: request.name,
            cpf: request.cpf,
            email: request.email,
            hashedPassword,
            previousCashbackBalance,
        }).catch((error) => {
            if (error.errors[0].type === 'unique violation') {
                throw createError(409, 'Already exists a user with the same cpf or email');
            }
            throw error;
        });

        return res.status(201).json({
            message: 'Successfully registered retailer',
            timestamp: request.timestamp,
        });
    } catch (error) {
        return next(error);
    }
};

const router = Router();
router.post('/', postSignUp);

export default router;
