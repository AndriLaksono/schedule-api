import connection from "../../db/mysql";

export interface ScheduleInterface {
    name: String;
    date: Date;
    start_time: String;
    end_time: String;
}
export interface ScheduleInterfaceFull extends ScheduleInterface {
    id: Number;
}

export class ScheduleServices {

    /**
     * Get all Schedule data
     */
    getSchedule() {
        const schedule = connection("schedule");
        return schedule;
    }

    /**
     * Get Schedule data by ID
     * @param id Schedule ID
     */
    getScheduleById(id: Number) {
        const schedule = connection("schedule").where("id", id);
        return schedule;
    }

    /**
     * Insert Schedule
     * @param data Schedule Data JSON
     */
    insertSchedule(data: ScheduleInterface) {
        const schedule = connection("schedule").insert(data);
        return schedule;
    }

    /**
     * Update Schedule
     * @param id Schedule ID
     * @param data Schedule Data JSON
     */
    updateScheduleById(id: Number, data: ScheduleInterface) {
        const schedule = connection("schedule").where("id", id).update(data);
        return schedule;
    }

    /**
     * Delete Schedule
     * @param id Schedule ID
     */
    deleteScheduleById(id: Number) {
        const schedule = connection("schedule").where("id", id).del();
        return schedule;
    }

    /**
     * Publish Schedule
     * @param id Schedule ID
     */
    publishScheduleById(id: Number) {
        const schedule = connection("schedule").where("id", id).update({ status: true });
        return schedule;
    }

    publishScheduleWeekByDate(week: Array<String>) {
        const schedule = connection("schedule").whereIn("date", week);
        return schedule;
    }

    /**
     * Check Published Schedule
     * @param id Schedule ID
     */
    checkPublishedSchedule(id: Number) {
        const schedule = connection("schedule").where({ id: id, status: true});
        return schedule;
    }

    /**
     * Check Avability schedule
     * @param date Date schedule. Format (yyyy-mm-dd)
     * @param start Timestamp start. Format (yyyy-mm-dd H:i:s)
     * @param end Timestamp end. Format (yyyy-mm-dd H:i:s)
     */
    checkAvabilitySchedule(date: Date, start: Date, end: Date) {
        const schedule = connection.raw(`SELECT * FROM schedule WHERE date = "${date}" AND 
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
    checkAvabilityScheduleExceptId(id: Number, date: Date, start: Date, end: Date) {
        const schedule = connection.raw(`SELECT * FROM schedule WHERE date = "${date}" AND 
                            (("${start}" BETWEEN start_time AND end_time) OR
                            ("${end}" BETWEEN start_time AND end_time)) AND id <> ${id};`);
        return schedule;
    }


}