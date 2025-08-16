const os = require('node:os');
const { spawn } = require('node:child_process');

const scheduleAllBells = require('./scheduleAllBells');
const getNextBells = require('./getNextBells');

let { cronJobs, schedule } = require('../constants');

const onServerStart = async (port) => {
  console.log(`🔔 School Bell System running on http://localhost:${port}`);
  console.log('📋 Web interface available at the above URL');

  await scheduleAllBells(cronJobs, schedule);

  console.log('\n📅 Next scheduled events:');

  getNextBells(schedule).forEach(bell => {
    console.log(`${bell.time} - ${bell.event}`);
  });

  const platform = os.platform();
  const url = `http://localhost:${port}`;

  if (platform === 'linux') {
    spawn('xdg-open', [url], { stdio: 'ignore' });
  } else if (platform === 'win32') {
    spawn('cmd', ['/c', 'start', url], { stdio: 'ignore' });
  }
};

module.exports = onServerStart;