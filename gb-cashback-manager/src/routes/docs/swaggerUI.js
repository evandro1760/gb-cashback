import { Router } from 'express';
import { readFileSync } from 'fs';

const swaggerTemplate = readFileSync('./src/static/swagger-ui-template.html');

const getSwaggerUi = (request, response, next) => {
    response.set('Content-Type', 'text/html');
    response.status(200).send(swaggerTemplate);
    return next();
};

const router = Router();
router.get('/', getSwaggerUi);

export {
    router as default,
};
