import { Router } from 'express';

import authRouter from './auth/index.js';
import purchaseRouter from './purchase/index.js';
import cashbackRouter from './cashback/index.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/purchase', purchaseRouter);
router.use('/cashback', cashbackRouter);

export default router;
