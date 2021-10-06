import { Router } from 'express';

import balanceRouter from './balance.js';

const router = Router();

router.use('/balance', balanceRouter);

export default router;
