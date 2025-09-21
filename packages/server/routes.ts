import express from 'express';
import type { Request, Response } from 'express';

import { priceEstimatorController } from './controller/priceEstimator.controller';

const router = express.Router();

router.post('/api/priceEstimator', priceEstimatorController.getEstimatedPrice);

export default router;
