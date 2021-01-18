import { Router } from 'express';
import { ScheduleController } from './controller.schedule';

const router = Router();
const controller = new ScheduleController();

/**
 * @swagger
 * /api/schedule:
 *    get:
 *     tags:
 *     - "schedule"
 *     summary: Retrieve a list of schedules.
 *     description: Retrieve a list of schedules.
 *     responses:
 *       200:
 *         description: A list of schedule.
 */
router.get('/', controller.getSchedule);
router.get('/:id', controller.getScheduleById);
router.post('/', controller.insertSchedule);
router.put('/:id', controller.updateScheduleById);
router.delete('/:id', controller.deleteScheduleById);
router.put('/publish/:id', controller.publishScheduleById);

export default router;
