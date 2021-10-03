import { Router } from 'express';

import health from './health.js';
import info from './info.js';

const router = Router();

router.use('/health', health);
router.use('/info', info);

export default router;
