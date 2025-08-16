const playAudio = require('../playAudio');
const { schedule } = require('../../constants');

const breakEndHandler = async (index, classItem) => {
  console.log(`🔔 Break ending after ${classItem.name} - Next class starts soon`);
  await playAudio(schedule.settings.bellSound);
};

module.exports = breakEndHandler;