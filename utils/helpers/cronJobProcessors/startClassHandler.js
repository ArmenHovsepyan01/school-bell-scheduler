const playAudio = require('../playAudio');
const { schedule } = require('../../constants');

const startClassHandler = async (index, classItem) => {
  console.log(`🔔 Class ${index + 1} starting: ${classItem.name}`);
  await playAudio(schedule.settings.bellSound);
};

module.exports = startClassHandler;