import { SERVER } from './src/config/env.js';
import initApp, { logger } from './src/app.js';

Promise.resolve()
    .then(async () => {
        const app = initApp({
            serverTimeout: SERVER.TIMEOUT,
            showLOG: true,
        });
        app.listen(SERVER.PORT, () => logger.info('All services started'));
    })
    .catch(async (err) => logger.error(err));
