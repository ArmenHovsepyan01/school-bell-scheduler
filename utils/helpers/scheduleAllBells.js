const cron = require('node-cron');

const addMinutesToTime = require('./addMinutesToTime');
const logTheScheduledClasses = require('./logScheduledClasses');
const startClassHandler = require('./cronJobProcessors/startClassHandler');
const classBreakHandler = require('./cronJobProcessors/classBreakHandler');
const breakEndHandler = require('./cronJobProcessors/breakEndHandler');
const playAnthemHandler = require('./cronJobProcessors/playAnthemHandler');

const { isMonday, isWeekend } = require('./dates');

async function scheduleAllBells(cronJobs, schedule) {
  if (isWeekend()) {
    console.log('It\'s weekend, no bells scheduled.');

    return;
  }

  console.log('Scheduling bells, 🔔...');

  cronJobs.forEach(job => job.stop());
  cronJobs = [];

  schedule.classes.forEach((classItem, index) => {
    const [startHour, startMin] = classItem.startTime.split(':');
    const startJob = cron.schedule(`${startMin} ${startHour} * * *`, () => startClassHandler(index, classItem));
    cronJobs.push(startJob);

    const [endHour, endMin] = classItem.endTime.split(':');
    const endJob = cron.schedule(`${endMin} ${endHour} * * *`, () => classBreakHandler(index, classItem));

    cronJobs.push(endJob);

    if (classItem.breakDuration > 0 && index < schedule.classes.length - 1) {
      const breakEndTime = addMinutesToTime(classItem.endTime, classItem.breakDuration);
      const [breakEndHour, breakEndMin] = breakEndTime.split(':');

      const breakEndJob = cron.schedule(`${breakEndMin} ${breakEndHour} * * *`, () => breakEndHandler(index, classItem));

      cronJobs.push(breakEndJob);
    }
  });

  if (schedule.settings.anthemStartTime && isMonday()) {
    const [anthemHour, anthemMin] = schedule.settings.anthemStartTime.split(':');
    const anthemJob = cron.schedule(`${anthemMin} ${anthemHour} * * *`, playAnthemHandler);
    cronJobs.push(anthemJob);
  }

  console.log(`✅ Scheduled ${cronJobs.length} bell/music events`);

  logTheScheduledClasses(schedule);

  console.log('🔔 All bells scheduled successfully!');
}

module.exports = scheduleAllBells;