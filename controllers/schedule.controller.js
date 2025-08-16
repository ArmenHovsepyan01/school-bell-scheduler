const path = require('path');
const { promises: fs } = require('fs');

const scheduleAllBells = require('../utils/helpers/scheduleAllBells');
const getNextBells = require('../utils/helpers/getNextBells');

let { schedule, cronJobs, scheduleFilePath } = require('../utils/constants');

const getSchedule = (req, res) => {
  return res.json(schedule);
};

const updateSchedule = async (req, res) => {
  try {
    schedule = req.body;
    await scheduleAllBells(cronJobs, schedule);

    await fs.writeFile(scheduleFilePath, JSON.stringify(schedule, null, 2));

    return res.json({ success: true, message: 'Schedule updated successfully' });
  } catch (error) {
    console.error('Error updating schedule:', error);
    return res.status(500).json({ success: false, message: 'Failed to update schedule' });
  }
};

const checkScheduleStatus = (req, res) => {
  try {
    return res.json({
      status: 'running',
      activeJobs: cronJobs.length,
      nextBells: getNextBells(schedule)
    });
  } catch (error) {
    console.error('Error checking schedule status:', error);
    return res.status(500).json({ success: false, message: 'Failed to check schedule status' });
  }
};

const getHomePage = (req, res) => {
  return res.sendFile(path.join(path.resolve(), 'public', 'index.html'));
};

module.exports = {
  getSchedule,
  updateSchedule,
  checkScheduleStatus,
  getHomePage
};