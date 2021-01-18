"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleController = void 0;
const HttpExpection_1 = __importDefault(require("../../errors/HttpExpection"));
const services_schedule_1 = require("./services.schedule");
const services = new services_schedule_1.ScheduleServices();
class ScheduleController {
    getSchedule(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield services.getSchedule();
                return res.json({
                    message: 'Success get data',
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getScheduleById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield services.getScheduleById(+req.params.id);
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
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     *
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    insertSchedule(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    name: req.body.name,
                    date: req.body.date,
                    start_time: req.body.start_time,
                    end_time: req.body.end_time,
                };
                // check avability
                const check = yield services.checkAvabilitySchedule(data.date, data.start_time, data.end_time);
                if (check[0].length > 0) {
                    return res.status(400).json({
                        message: 'The schedule already exists',
                    });
                }
                // insert if all cases passed
                yield services.insertSchedule(data);
                return res.json({
                    message: 'Data Created',
                });
            }
            catch (error) {
                next(new HttpExpection_1.default(400, {
                    message: 'Error format input',
                }));
            }
        });
    }
    /**
     * Update schedule by id
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    updateScheduleById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const data = {
                    name: req.body.name,
                    date: req.body.date,
                    start_time: req.body.start_time,
                    end_time: req.body.end_time,
                };
                // check avability except this day
                const checkAvability = yield services.checkAvabilityScheduleExceptId(+id, data.date, data.start_time, data.end_time);
                if (checkAvability[0].length > 0) {
                    return res.status(400).json({
                        message: 'The schedule already exists',
                    });
                }
                // check schedule is publish
                const checkPublish = yield services.checkPublishedSchedule(+id);
                if (checkPublish.length > 0) {
                    return res.status(400).json({
                        message: "Can't update a published schedule.",
                    });
                }
                // update if all cases passed
                yield services.updateScheduleById(+id, data);
                return res.json({
                    message: 'Data Updated',
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * Delete schedule by id
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    deleteScheduleById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check schedule is publish
                const id = req.params.id;
                const checkPublish = yield services.checkPublishedSchedule(+id);
                if (checkPublish.length > 0) {
                    return res.status(400).json({
                        message: "Can't delete a published schedule.",
                    });
                }
                yield services.deleteScheduleById(+id);
                return res.json({
                    message: 'Success delete data',
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * Publish schedule by id
     * @param req Express Request
     * @param res Express Response
     * @param next Callback if Errors
     * @returns JSON data
     */
    publishScheduleById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield services.publishScheduleById(+req.params.id);
                return res.json({
                    message: 'Schedule Published!',
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ScheduleController = ScheduleController;
