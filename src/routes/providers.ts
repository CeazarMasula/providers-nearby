import { Router } from 'express';
import { getNearbyProviders } from '../controllers/providerController';

const router = Router();

router.post('/nearby', getNearbyProviders);

export default router;
