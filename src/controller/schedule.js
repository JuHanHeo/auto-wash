'use strict';

const schedule = require('node-schedule');
const axios = require('axios');

class Schedule {
    constructor() {
    }

    daySchedule(params) {
        const rule = new schedule.RecurrenceRule();
        rule.second = [];
        rule.minute = [];
        rule.hour = [];
        rule.tz = 'Asia/Seoul';

        rule.second.push(params.second);
        rule.minute.push(params.minute);
        rule.hour.push(params.hour);

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