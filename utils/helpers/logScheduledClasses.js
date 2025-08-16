const addMinutesToTime = require('./addMinutesToTime');

const logTheScheduledClasses = (schedule) => {
  console.log(`📋 Break schedule:`);

  schedule.classes.forEach((classItem, index) => {
    if (classItem.breakDuration > 0) {
      const breakEnd = addMinutesToTime(classItem.endTime, classItem.breakDuration);
      console.log(`   ${classItem.endTime} - ${breakEnd} (${classItem.breakDuration}min break after ${classItem.name})`);
    }
  });
};

module.exports = logTheScheduledClasses;