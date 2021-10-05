import { Router } from 'express';
import SHA256 from 'crypto-js/sha256.js';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

import PostSignInRequest from '../../../../requests/PostSignInRequest.js';
import { database, retailer } from '../../../../database/index.js';
import { JWT } from '../../../../config/env.js';

const postSignIn = async (req, res, next) => {
    try {
        const request = new PostSignInRequest(req);
        const hashedPassword = SHA256(request.password).toString();

        await database.sync();
        const user = await retailer.findOne({
            where: {
                email: request.email,
                hashedPassword,
            },
        });

        if (!user) {
            throw createError(401, 'Username and/or password incorrect');
        }

        const accessToken = jwt.sign(
            { idRetailer: user.idRetailer },
            JWT.SECRET,
            { expiresIn: JWT.EXPIRES_IN },
        );

        return res.status(200).json({
            message: 'Login successfully',
            accessToken,
            expiresIn: JWT.EXPIRES_IN,
            timestamp: req.timestamp,
        });
    } catch (error) {
        return next(error);
    }
};

const router = Router();
router.post('/', postSignIn);

export default router;
