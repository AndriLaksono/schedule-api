"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_schedule_1 = require("./controller.schedule");
const router = express_1.Router();
const controller = new controller_schedule_1.ScheduleController();
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
exports.default = router;
