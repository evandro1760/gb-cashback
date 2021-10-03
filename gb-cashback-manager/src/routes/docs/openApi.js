import { Router } from 'express';
import { readFileSync } from 'fs';

import { SERVER } from '../../config/env.js';

const swaggerDocument = JSON.parse(readFileSync('./src/static/gb-cashback-manager.swagger.json'));

const getOpenApiDefinition = (request, response, next) => {
    swaggerDocument.info.title = SERVER.NAME;
    swaggerDocument.info.version = SERVER.VERSION;
    swaggerDocument.info.description = SERVER.DESC;
    response.status(200).json(swaggerDocument);
    return next();
};

const router = Router();
router.get('/', getOpenApiDefinition);

export {
    router as default,
};
