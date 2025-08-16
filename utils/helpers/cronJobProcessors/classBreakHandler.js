const playAudio = require('../playAudio');
const { setTimeout } = require('node:timers/promises');
const { schedule } = require('../../constants');

const classBreakHandler = async (index, classItem) => {
  console.log(`🔔 Class ${index + 1} ending: ${classItem.name}`);

  await playAudio(schedule.settings.bellSound);
  await setTimeout(11000);

  if (classItem.breakDuration > 0) {
    console.log(`🎵 Starting ${classItem.breakDuration}min break music after ${classItem.name}`);
    await playAudio(classItem.musicFile);
  }
};

module.exports = classBreakHandler;