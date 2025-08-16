const { join, resolve } = require('node:path');

const soundsPath = join(resolve(), 'sounds');
const scheduleFilePath = join(resolve(), 'data/schedule.json');

const MUSIC_FILE_PATHS = {
  BELL: resolve(soundsPath, 'bell.wav'),
  ANTHEM: resolve(soundsPath, 'anthem_2.wav'),
  BREAK_MUSIC_1: resolve(soundsPath, 'dancin.wav'),
  BREAK_MUSIC_2: resolve(soundsPath, 'break_music.wav'),
  BREAK_MUSIC_3: resolve(soundsPath, 'my_way.wav'),
  BREAK_MUSIC_4: resolve(soundsPath, 'joy_crooks.wav'),
};

const schedule = {
  classes: [
    {
      startTime: '20:40',
      endTime: '20:43',
      name: '1st Period',
      breakDuration: 5,
      musicFile: MUSIC_FILE_PATHS.BREAK_MUSIC_1
    },
    {
      startTime: '20:48',
      endTime: '20:50',
      name: '2nd Period',
      breakDuration: 5,
      musicFile: MUSIC_FILE_PATHS.BREAK_MUSIC_2
    },
    {
      startTime: '20:55',
      endTime: '20:56',
      name: '3rd Period',
      breakDuration: 10,
      musicFile: MUSIC_FILE_PATHS.BREAK_MUSIC_3
    },
    {
      startTime: '11:35',
      endTime: '12:20',
      name: '4th Period',
      breakDuration: 20,
      musicFile: MUSIC_FILE_PATHS.BREAK_MUSIC_1
    },
    {
      startTime: '12:40',
      endTime: '13:25',
      name: '5th Period',
      breakDuration: 5,
      musicFile: MUSIC_FILE_PATHS.BREAK_MUSIC_1
    },
    {
      startTime: '13:30',
      endTime: '14:15',
      name: '6th Period',
      breakDuration: 5,
      musicFile: MUSIC_FILE_PATHS.BREAK_MUSIC_1
    },
    {
      startTime: '14:20',
      endTime: '15:05',
      name: '7th Period',
      breakDuration: 0,
      musicFile: MUSIC_FILE_PATHS.BREAK_MUSIC_1
    }
  ],
  settings: {
    bellDuration: 60000,
    endBellDuration: 10000,
    bellSound: MUSIC_FILE_PATHS.BELL,
    anthemStartTime: "20:59",
  }
};

const cronJobs = [];

module.exports = {
  soundsPath,
  scheduleFilePath,
  MUSIC_FILE_PATHS,
  schedule,
  cronJobs
};