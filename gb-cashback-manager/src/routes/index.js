import { Router } from 'express';

import actuator from './actuator/index.js';
import apiDocs from './docs/index.js';
import routingToV1 from './v1/index.js';

const router = Router();

router.use('/actuator', actuator);
router.use('/docs', apiDocs);
router.use('/v1', routingToV1);

export default router;
