const path = require('path');
const checkFileExists = require('./checkFileExists');
const { exec } = require('child_process');

const playAudio = async (audioPath) => {
  const fullPath = path.resolve('sounds', audioPath);
  const isFileExists = await checkFileExists(fullPath);

  if (!isFileExists) {
    console.log(`❌ ${audioPath}: File not found - ${fullPath}`);
    return;
  }

  console.log(`🎵 Playing ${audioPath}: ${path.basename(fullPath)}`);

  const fileExt = path.extname(fullPath).toLowerCase();

  if (fileExt === '.wav') {
    exec(`powershell -c "try { (New-Object Media.SoundPlayer '${fullPath}').PlaySync(); Write-Host 'SUCCESS' } catch { Write-Host 'ERROR:' $_.Exception.Message }"`,
      (error, stdout, stderr) => {
        if (stdout.includes('SUCCESS')) {
          console.log(`✅ ${audioPath}: WAV playback successful`);
          return true;
        } else {
          console.log(`❌ ${audioPath}: WAV playback failed - ${stdout || stderr}`);
          return false;
        }
      }
    );
  } else {
    exec(`powershell -c "try { Add-Type -AssemblyName presentationCore; $player = New-Object System.Windows.Media.MediaPlayer; $player.Open('${fullPath}'); $player.Play(); Start-Sleep -Seconds 2; $player.Close(); Write-Host 'SUCCESS' } catch { Write-Host 'ERROR:' $_.Exception.Message }"`,
      (error, stdout, stderr) => {
        if (stdout.includes('SUCCESS')) {
          console.log(`✅ ${audioPath}: MP3 playback successful`);
          return true;
        } else {
          console.log(`❌ ${audioPath}: MP3 playback failed - ${stdout || stderr}`);
          console.log(`💡 Try converting ${audioPath} to WAV format for better compatibility`);
          return false;
        }
      }
    );
  }
};

module.exports = playAudio;