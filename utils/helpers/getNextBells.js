const addMinutesToTime = require('./addMinutesToTime');

function getNextBells(schedule) {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const upcoming = [];

  schedule.classes.forEach((classItem, index) => {
    if (classItem.startTime > currentTime) {
      upcoming.push({ time: classItem.startTime, event: `${classItem.name} starts (1min bell)` });
    }

    if (classItem.endTime > currentTime) {
      if (classItem.breakDuration > 0) {
        upcoming.push({
          time: classItem.endTime,
          event: `${classItem.name} ends + ${classItem.breakDuration}min music break starts`
        });

        const breakEndTime = addMinutesToTime(classItem.endTime, classItem.breakDuration);
        if (breakEndTime > currentTime && index < schedule.classes.length - 1) {
          upcoming.push({ time: breakEndTime, event: `Break ends - ${schedule.classes[index + 1].name} bell` });
        }
      } else {
        upcoming.push({ time: classItem.endTime, event: `${classItem.name} ends (final class)` });
      }
    }
  });

  return upcoming.sort((a, b) => a.time.localeCompare(b.time)).slice(0, 5);
}

module.exports = getNextBells;