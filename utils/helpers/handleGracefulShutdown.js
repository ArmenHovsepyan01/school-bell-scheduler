const { cronJobs } = require('../constants');

const handleGracefulShutdown = () => {
  console.log('\n🛑 Shutting down School Bell System...');
  cronJobs.forEach(job => job.stop());
  process.exit(0);
};

module.exports = handleGracefulShutdown;