import { Router } from 'express';

import retailerRouting from './retailer/index.js';

const router = Router();

router.use('/retailer', retailerRouting);

export default router;
