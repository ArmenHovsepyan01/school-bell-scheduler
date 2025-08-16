const { spawn } = require('node:child_process');

const scheduleAllBells = require('./scheduleAllBells');
const getNextBells = require('./getNextBells');

let { cronJobs, schedule } = require('../constants');
const playAnthemHandler = require('./cronJobProcessors/playAnthemHandler');

const onServerStart = async (port) => {
  console.log(`🔔 School Bell System running on http://localhost:${port}`);
  console.log('📋 Web interface available at the above URL');

  await scheduleAllBells(cronJobs, schedule);

  console.log('\n📅 Next scheduled events:');

  await playAnthemHandler();

  getNextBells(schedule).forEach(bell => {
    console.log(`${bell.time} - ${bell.event}`);
  });

  spawn('cmd', ['/c', 'start', `http://localhost:${port}`], { stdio: 'ignore' });
};

module.exports = onServerStart;