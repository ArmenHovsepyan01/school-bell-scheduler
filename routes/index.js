const router = require('express').Router();
const { getHomePage, checkScheduleStatus, getSchedule, updateSchedule } = require('../controllers/schedule.controller');

router.get('/', getHomePage);
router.get('/schedule', getSchedule);
router.post('/schedule', updateSchedule);
router.get('/status', checkScheduleStatus);

module.exports = router;