import { Router } from 'express';

import openApiDefinition from './openApi.js';
import swaggerUi from './swaggerUI.js';

const router = Router();

router.use('/openapi', openApiDefinition);
router.use('/swagger-ui', swaggerUi);

export default router;
