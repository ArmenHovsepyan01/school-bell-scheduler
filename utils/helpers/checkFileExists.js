const { access } = require('node:fs').promises;
const { constants } = require('node:fs');

async function checkFileExists(filePath) {
  try {
    await access(filePath, constants.R_OK | constants.W_OK);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}

module.exports = checkFileExists;