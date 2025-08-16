# School Bell Scheduler

Automated, configurable school bell system with a web-based interface. It rings start/end-of-class bells, plays optional music during breaks, and can schedule a daily anthem — all driven by a simple JSON schedule and cron-style timers.

This project was created to help schools automate their daily bell routines reliably on a local machine with minimal setup and an intuitive UI for staff to maintain schedules.

## Key Features

- Web UI to manage the daily class schedule:
  - Set period names, start/end times (24h format), and break durations (minutes)
  - Configure bell durations (start and end bells)
  - Toggle music during breaks
  - View the next five upcoming events
- Automated scheduling with node-cron:
  - Start-of-class bell
  - End-of-class bell + optional break music
  - Break-end bell
  - Daily anthem at a configured time
- Plays local audio files (bell and music)
- Persists changes to disk (data/schedule.json)

## How It Works (Architecture)

- Server: Node.js + Express (app.js)
  - Endpoints:
    - GET /api/schedule → returns current schedule JSON
    - POST /api/schedule → saves schedule, re-schedules all cron jobs
    - GET /api/status → returns active cron jobs count and upcoming events
    - GET / → serves the web UI (public/index.html)
- Scheduling: node-cron (utils/helpers/scheduleAllBells.js)
  - For each class:
    - Schedules start bell at startTime
    - Schedules end bell at endTime
    - If breakDuration > 0 and there is a next class, schedules break-end bell at endTime + breakDuration
  - Schedules daily anthem at settings.anthemStartTime (if set)
- Event Handlers:
  - utils/helpers/cronJobProcessors/*.js (startClassHandler, classBreakHandler, breakEndHandler, playAnthemHandler)
  - Use the play-sound package to play audio files
- Next events preview (utils/helpers/getNextBells.js): computes and returns the next five upcoming events based on the current time
- Configuration and defaults (utils/constants/index.js):
  - Sounds folder path
  - Default schedule with example class times and break durations
  - Default settings like bellDuration, endBellDuration, bell sound, and anthem time

## Requirements

- Node.js 18+ (recommended)
- A machine with audio output (the app uses the OS media player via play-sound)
- Local audio files in a sounds folder (see “Sounds folder”)
- Permissions to write to the data directory (for schedule persistence)

## Quick Start

1) Clone and install
```bash
git clone https://github.com/ArmenHovsepyan01/school-bell-scheduler.git
cd school-bell-scheduler
npm install
```

2) Create your .env file (optional but recommended)
Create a .env file in the project root to customize runtime options:
```
PORT=3000
# Add any other environment variables you may need in your setup
```
If PORT is not set, the app will use its internal default. See “Configuration via .env” below.

3) Prepare the sounds folder
Create a folder named sounds in the project root and add your audio files. By default, the code expects these filenames:
- bell.wav
- anthem_2.wav
- break_music.wav

You can change the file names or add more tracks by editing utils/constants/index.js.

4) Ensure the data directory exists
Create the data folder so the app can persist the schedule:
```bash
mkdir -p data
```
The app will save the current schedule to data/schedule.json.

5) Start the server
```bash
npm start
```
Then open http://localhost:3000 (or your PORT) in your browser.
Note: On Windows, the app attempts to auto-open your default browser.

## Using the Web Interface

- Class Schedule table
  - Edit period name, startTime, endTime (24-hour HH:MM), and break duration (minutes)
  - Add or remove periods as needed
- Settings
  - Class Start Bell Duration (seconds): how long to play the start bell
  - Class End Bell Duration (seconds): how long to play the end bell
  - Play Music During Breaks: Yes/No toggle
- Next Events
  - Shows the next five events computed from the current time
- Save Schedule
  - Click “Save Schedule” to persist changes and re-schedule all bells
  - The schedule is saved to data/schedule.json
- Reset to Default
  - Reloads to the built-in default schedule

## Schedule Data Structure

When you GET /api/schedule you receive an object like:
```json
{
  "classes": [
    {
      "startTime": "08:30",
      "endTime": "09:15",
      "name": "1st Period",
      "breakDuration": 5,
      "musicFile": "/absolute/path/to/sounds/dancin.wav"
    }
  ],
  "settings": {
    "bellDuration": 60000,
    "endBellDuration": 10000,
    "bellSound": "/absolute/path/to/sounds/bell.wav",
    "anthemStartTime": "20:59",
    "playMusicDuringBreaks": true
  }
}
```

Notes:
- Time format: HH:MM (24-hour)
- breakDuration is minutes (integer)
- bellDuration and endBellDuration are milliseconds in storage (the UI shows seconds)
- musicFile is optional per class; handlers can use it when playing break music
- anthemStartTime is optional; omit or leave empty to disable anthem

## API Endpoints

- GET /api/schedule
  - Returns the full schedule object
- POST /api/schedule
  - Body: full schedule object (classes + settings)
  - Persists the schedule to data/schedule.json and re-schedules all bells
- GET /api/status
  - Returns { status, activeJobs, nextBells } where nextBells is a list like:
    ```json
    [
      { "time": "09:15", "event": "1st Period ends + 5min music break starts" },
      { "time": "09:20", "event": "Break ends - 2nd Period bell" }
    ]
    ```

## Sounds Folder

- Location: project-root/sounds
- Default filenames used in utils/constants/index.js:
  - bell.wav
  - anthem_2.wav
  - break_music.wav
- You can replace these with your own. Update utils/constants/index.js to point to the correct files if you change names.
- Ensure the files are valid audio formats supported by your OS player.

## Configuration via .env

Create a .env file in the project root. Common entries:
- PORT: Port for the HTTP server (e.g., 3000)

The application reads PORT and otherwise uses its default. If you have special requirements for your OS media player, you may need to adjust the cron handlers or player configuration in the code.

## Run as a Service (Optional)

There is a helper script defined in package.json:
```bash
npm run install-service
```
This invokes install-service.js, which you can tailor for your OS to run the app on startup. Review and adjust that script to suit your environment.

## Customization Tips

- Change default schedule and settings
  - Edit utils/constants/index.js
- Change or add music
  - Drop files into sounds and update paths in utils/constants/index.js
- Adjust how audio is played
  - Review utils/helpers/cronJobProcessors for bell and music playback logic
- Modify upcoming events display
  - Update utils/helpers/getNextBells.js and the UI section in public/index.html

## Troubleshooting

- No sound plays
  - Verify your sounds folder and file names match utils/constants/index.js
  - Confirm your machine’s audio output works
  - Some systems require specifying an audio player for play-sound; adapt handlers if needed
- “No upcoming events today”
  - Check times are in HH:MM 24-hour format and later than current time
- Schedule didn’t save
  - Ensure the data directory exists and the process has write permissions
- Times are off
  - Check your system clock and timezone; the scheduler uses the server’s local time
- Browser didn’t open automatically
  - On non-Windows systems, open http://localhost:PORT manually

## Scripts

- npm start → run the server (node app.js)
- npm run dev → run with file watching
- npm run install-service → optional service setup script

## License

MIT
