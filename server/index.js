const express = require('express');
const { PORT } = require('./config');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');

async function start() {
    const app = express();

    await databaseConfig(app);
    expressConfig(app);

    app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });
}

start();