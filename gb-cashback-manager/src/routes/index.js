import { Router } from 'express';

import actuator from './actuator/index.js';

const router = Router();

router.use('/actuator', actuator);

export default router;
