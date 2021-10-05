import { Router } from 'express';

import signinRouter from './signin.js';
import signupRouter from './signup.js';

const router = Router();

router.use('/signin', signinRouter);
router.use('/signup', signupRouter);

export default router;
