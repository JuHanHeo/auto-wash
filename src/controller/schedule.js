'use strict';

const schedule = require('node-schedule');
const axios = require('axios');

class Schedule {
    constructor() {
    }

    daySchedule(params) {
        const rule = new schedule.RecurrenceRule();
        rule.second = 11;
        rule.minute = 11;
        rule.hour = 11;
        rule.tz = 'Asia/Seoul';

        const job = schedule.scheduleJob(rule, async () => {

            await axios.get( 'http://localhost:3333/check', {
                params: {
                    id: params.id,
                    passwd: params.passwd
                }
            });

            return true;
        });
    }
}

module.exports = Schedule;