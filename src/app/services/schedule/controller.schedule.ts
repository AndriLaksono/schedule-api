import { Request, Response, NextFunction } from 'express';
import HttpExpection from '../../errors/HttpExpection';
import { ScheduleServices } from './services.schedule';

const services = new ScheduleServices();

export class ScheduleController {
    async getSchedule(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await services.getSchedule();
            return res.json({
                message: 'Success get data',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async getScheduleById(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await services.getScheduleById(+req.params.id);
            if (result.length > 0) {
                return res.json({
                    message: 'Success get data',
                    data: result[0],
                });
            }
            return res.json({
                message: 'Data not found',
                data: null,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     *
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async insertSchedule(req: Request, res: Response, next: NextFunction) {
        try {
            const data = {
                name: req.body.name,
                date: req.body.date,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
            };

            // check avability
            const check = await services.checkAvabilitySchedule(data.date, data.start_time, data.end_time);
            if (check[0].length > 0) {
                return res.status(400).json({
                    message: 'The schedule already exists',
                });
            }

            // insert if all cases passed
            await services.insertSchedule(data);

            return res.json({
                message: 'Data Created',
            });
        } catch (error) {
            next(
                new HttpExpection(400, {
                    message: 'Error format input',
                }),
            );
        }
    }

    /**
     * Update schedule by id
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async updateScheduleById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const data = {
                name: req.body.name,
                date: req.body.date,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
            };

            // check avability except this day
            const checkAvability = await services.checkAvabilityScheduleExceptId(
                +id,
                data.date,
                data.start_time,
                data.end_time,
            );
            if (checkAvability[0].length > 0) {
                return res.status(400).json({
                    message: 'The schedule already exists',
                });
            }

            // check schedule is publish
            const checkPublish = await services.checkPublishedSchedule(+id);
            if (checkPublish.length > 0) {
                return res.status(400).json({
                    message: "Can't update a published schedule.",
                });
            }

            // update if all cases passed
            await services.updateScheduleById(+id, data);
            return res.json({
                message: 'Data Updated',
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete schedule by id
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async deleteScheduleById(req: Request, res: Response, next: NextFunction) {
        try {
            // check schedule is publish
            const id = req.params.id;
            const checkPublish = await services.checkPublishedSchedule(+id);

            if (checkPublish.length > 0) {
                return res.status(400).json({
                    message: "Can't delete a published schedule.",
                });
            }
            await services.deleteScheduleById(+id);
            return res.json({
                message: 'Success delete data',
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Publish schedule by id
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    async publishScheduleById(req: Request, res: Response, next: NextFunction) {
        try {
            await services.publishScheduleById(+req.params.id);
            return res.json({
                message: 'Schedule Published!',
            });
        } catch (error) {
            next(error);
        }
    }
}
