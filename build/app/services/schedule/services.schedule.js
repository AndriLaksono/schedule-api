"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleServices = void 0;
const mysql_1 = __importDefault(require("../../db/mysql"));
class ScheduleServices {
    /**
     * Get all Schedule data
     */
    getSchedule() {
        const schedule = mysql_1.default('schedule');
        return schedule;
    }
    /**
     * Get Schedule data by ID
     * @param id Schedule ID
     */
    getScheduleById(id) {
        const schedule = mysql_1.default('schedule').where('id', id);
        return schedule;
    }
    /**
     * Insert Schedule
     * @param data Schedule Data JSON
     */
    insertSchedule(data) {
        const schedule = mysql_1.default('schedule').insert(data);
        return schedule;
    }
    /**
     * Update Schedule
     * @param id Schedule ID
     * @param data Schedule Data JSON
     */
    updateScheduleById(id, data) {
        const schedule = mysql_1.default('schedule').where('id', id).update(data);
        return schedule;
    }
    /**
     * Delete Schedule
     * @param id Schedule ID
     */
    deleteScheduleById(id) {
        const schedule = mysql_1.default('schedule').where('id', id).del();
        return schedule;
    }
    /**
     * Publish Schedule
     * @param id Schedule ID
     */
    publishScheduleById(id) {
        const schedule = mysql_1.default('schedule').where('id', id).update({ status: true });
        return schedule;
    }
    publishScheduleWeekByDate(week) {
        const schedule = mysql_1.default('schedule').whereIn('date', week);
        return schedule;
    }
    /**
     * Check Published Schedule
     * @param id Schedule ID
     */
    checkPublishedSchedule(id) {
        const schedule = mysql_1.default('schedule').where({ id: id, status: true });
        return schedule;
    }
    /**
     * Check Avability schedule
     * @param date Date schedule. Format (yyyy-mm-dd)
     * @param start Timestamp start. Format (yyyy-mm-dd H:i:s)
     * @param end Timestamp end. Format (yyyy-mm-dd H:i:s)
     */
    checkAvabilitySchedule(date, start, end) {
        const schedule = mysql_1.default.raw(`SELECT * FROM schedule WHERE date = "${date}" AND 
                            (("${start}" BETWEEN start_time AND end_time) OR
                            ("${end}" BETWEEN start_time AND end_time));`);
        return schedule;
    }
    /**
     * Check Avability schedule except ID
     * @param id Schedule ID. Number
     * @param date Date schedule. Format (yyyy-mm-dd)
     * @param start Timestamp start. Format (yyyy-mm-dd H:i:s)
     * @param end Timestamp end. Format (yyyy-mm-dd H:i:s)
     */
    checkAvabilityScheduleExceptId(id, date, start, end) {
        const schedule = mysql_1.default.raw(`SELECT * FROM schedule WHERE date = "${date}" AND 
                            (("${start}" BETWEEN start_time AND end_time) OR
                            ("${end}" BETWEEN start_time AND end_time)) AND id <> ${id};`);
        return schedule;
    }
}
exports.ScheduleServices = ScheduleServices;
