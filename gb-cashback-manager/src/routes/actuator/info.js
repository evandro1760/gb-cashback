import { Router } from 'express';

import { SERVER } from '../../config/env.js';

const getInfo = async (request, response) => response.status(200).json({
    name: SERVER.NAME,
    version: SERVER.VERSION,
    description: SERVER.DESC,
});

const router = Router();
router.get('/', getInfo);

export {
    router as default,
};
