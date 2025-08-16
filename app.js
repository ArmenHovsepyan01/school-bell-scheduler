const { loadEnvFile } = require('node:process');
const express = require('express');

loadEnvFile();

const router = require('./routes');

const bodyParser = require('body-parser');

const onServerStart = require('./utils/helpers/onServerStart');
const handleGracefulShutdown = require('./utils/helpers/handleGracefulShutdown');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api', router);

app.listen(PORT, () => onServerStart(PORT));

process.on('SIGINT', handleGracefulShutdown);