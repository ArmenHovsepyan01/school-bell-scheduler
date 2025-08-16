const playAudio = require('../playAudio');
const { MUSIC_FILE_PATHS } = require('../../constants');

const playAnthemHandler = () => playAudio(MUSIC_FILE_PATHS.ANTHEM);

module.exports = playAnthemHandler;