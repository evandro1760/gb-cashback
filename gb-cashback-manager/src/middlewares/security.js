import { Router } from 'express';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';

import { JWT } from '../config/env.js';

const router = Router();

router.use((request, response, next) => {
    const inWhiteList = [
        '/actuator/health',
        '/v1/retailer/auth/signin',
        '/v1/retailer/auth/signup',
    ].includes(request.url);
    if (inWhiteList) {
        return next();
    }
    const authorizationToken = request.get('Authorization');
    try {
        request.session = jwt.verify(authorizationToken, JWT.SECRET);
    } catch (error) {
        return next(createError(401, 'invalid credentials'));
    }
    return next();
});

export {
    router as default,
};
