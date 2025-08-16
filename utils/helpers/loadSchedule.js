const { scheduleFilePath } = require('../constants');
const { readFile } = require('fs').promises;

const loadSchedule = async () => {
  try {
    const loadedSchedule = await readFile(scheduleFilePath, {
      encoding: 'utf-8'
    });

    return JSON.parse(loadedSchedule);
  } catch (error) {
    console.error('Error loading schedule:', error);
    throw error;
  }
};

module.exports = loadSchedule;