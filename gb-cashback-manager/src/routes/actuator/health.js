import { Router } from 'express';

import { SERVER } from '../../config/env.js';

const getHealth = async (request, response) => response.status(200).json({
    name: SERVER.NAME,
    message: 'application online',
    datetime: new Date(),
});

const router = Router();
router.get('/', getHealth);

export {
    router as default,
};
