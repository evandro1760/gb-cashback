import pino from 'pino';
import { Router } from 'express';
import pinoExpress from 'express-pino-logger';

import { SERVER } from '../config/env.js';

const router = Router();
const logger = pino({
    name: SERVER.NAME,
    serializers: {
        err: pino.stdSerializers.err,
        req: pino.stdSerializers.req,
        res: pino.stdSerializers.res,
    },
    redact: {
        paths: [
            'res.headers',
            'err.stack',
            'req.headers["x-api-key"]',
        ],
        remove: true,
    },
}).child({ version: SERVER.VERSION });

router.use(pinoExpress({ logger, wrapSerializers: false }));

export {
    router as default,
    logger,
};
