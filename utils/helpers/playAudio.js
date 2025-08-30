const path = require('path');
const checkFileExists = require('./checkFileExists');
const player = require('sound-play');

const playAudio = async (audioPath) => {
  const fullPath = path.resolve('sounds', audioPath);
  const isFileExists = await checkFileExists(fullPath);

  if (!isFileExists) {
    console.log(`❌ ${audioPath}: File not found - ${fullPath}`);
    return false;
  }

  console.log(`🎵 Playing ${audioPath}: ${path.basename(fullPath)}`);

  try {
    await player.play(audioPath);
    console.log(`✅ ${audioPath}: Playback successful`);
  } catch (error) {
    console.error(`❌ ${audioPath}: Playback failed - ${error?.message}`);
    console.log(error);
  }
};

module.exports = playAudio;