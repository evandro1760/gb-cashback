import express from 'express';

import loggerMid, { logger } from './middlewares/logger.js';
import timeoutMid from './middlewares/timeout.js';
// import securityMid from './middlewares/security.js';
import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

/**
 * Init the main application
 * @param {boolean} showLOG
 * @param {number} serverTimeout
 */

const initApp = ({ showLOG = false, serverTimeout = 30000 } = {}) => {
    const app = express();
    app.disable('x-powered-by');
    app.use(express.json());
    if (showLOG) app.use(loggerMid);
    app.use(timeoutMid(serverTimeout));
    // app.use(securityMid);
    app.use(routes);
    app.use(...errorHandler);
    return app;
};

export {
    initApp as default,
    logger,
};
