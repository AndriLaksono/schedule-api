import { Router } from 'express';

// Import Routes
import schedule from '../services/schedule/_routes.schedule';

const router = Router();

export default {
    schedule: router.use('/schedule', schedule),
};
