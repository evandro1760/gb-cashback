import { Router } from 'express';

import actuator from './actuator/index.js';
import apiDocs from './docs/index.js';

const router = Router();

router.use('/actuator', actuator);
router.use('/docs', apiDocs);

export default router;
