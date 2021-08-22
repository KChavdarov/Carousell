const mongoose = require('mongoose');
const { DB_CONNECTION_STRING } = require('./index');

module.exports = (app) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = mongoose.connection;

        db.once('open', () => {
            console.log('Database connected!');
            resolve();
        });

        db.on('error', (err) => {
            console.log(err.message);
            reject(err.message);
        });
    });
};