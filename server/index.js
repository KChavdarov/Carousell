const express = require('express');
const { PORT, CLOUDINARY } = require('./config');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const cloudinary = require('cloudinary').v2;

async function start() {
    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    cloudinary.config(CLOUDINARY);

    app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });
}

start();